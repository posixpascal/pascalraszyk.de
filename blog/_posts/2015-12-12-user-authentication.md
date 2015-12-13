---
title:  "AJAX File Upload with Angular"
date:   2015-12-11 10:18:00
description: Uploading files to any backend without external dependencies.
tags:
- angular
- file-upload
- ajax
---

Uploading Files is a fairly simple task if you only need to support modern browsers which support FormData and FileReader APIs.
Whenever any oldschool browser like IE is involved, I usually stick to well tested libraries like `blueimp`, `ng-file-upload` because they use serveral fallbacks under their hood. I suggest to take a look into one of these libraries if you need to support legacy browsers.

Anyways. In this post I'll only cover the modern archetype of browsers, so let's dive right in.

## Once upon a time...
... there was a little `file input` field named `document` in a lonely world of cross-browser issues, mimetype problems and many many other flaws which somehow let developers think something with `input file` is horribly broken. 

{% highlight html %}
<input type="file" class="form-control" name="document" required>
{% endhighlight %}

So one day the nice and charming witch gave every form the ability to be sent to a journey to a foreign land, the so called backend.
Every input field but file was glad to jump onto the ajaxtrain. File however had problems, its job was to hold special kind of data which wasn't transfered that easily.

First you'll had to add a special `enctype` to your form fields, but now comes ajax. I'll start by creating the required angular `$http` request to add the necessary mimetype

{% highlight js %}
    var uploadEndpoint = "/api/v1/file/upload";
    var formData = {};
    $http.post(uploadEndpoint, formData, {
      transformRequest: angular.identity,
      headers: {
        'Accept': 'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;image/webp,*/*;q=0.5',
        'Content-Type': undefined
      }
    }).then(handleSuccess);
{% endhighlight %}

The first thing that bothers me is the call to `angular.identity`, I looked it up on the chrome developer tools and noticed it just returns the given parameter:

>angular.identity = *function* $a(b){return b}

Looks like this is some kind of no-operation function, don't know. If someone knows why this function is necessary, tell me.
The `headers/Accept` key is required to make this code work with default Spring File Upload. 

But to upload a file, we need to use `FormData` instead of a regular JSON notation object. So let's fix the code from above:

{% highlight js %}
    var uploadEndpoint = "/api/v1/file/upload";
    var formData = new FormData();
    formData.append('file', this.file); // the file object.
    $http.post(uploadEndpoint, formData, {
      transformRequest: angular.identity,
      headers: {
        'Accept': 'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;image/webp,*/*;q=0.5',
        'Content-Type': undefined
      }
    }).then(handleSuccess);
{% endhighlight %}

Nice. Now let's include the required code to get the file object from our beloved `input[type="field"]`.
Since angular offers a nice feature called directive, I'm gonna use one of these to make it compatible across websites easily.

I'm using this directive in any angular app I use at work:

{% highlight js %}
angular.module('yourApp')
  .directive('fileModel', function ($parse) {
   return {
        restrict: 'A', 
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            
            element.bind('change', function(){
                scope.$apply(function(){
                    model.assign(scope, element[0].files[0]);
                    scope.$broadcast('file:set', element[0].files[0])
                });
            });
        }
    };
});

{% endhighlight %}

This directive checks for any element with a `file-model` attribute and whenever the element emits a `change` event, it uses `model.assign` to store the element's file to the parent $scope. Then I usually emit a `file:set` event to the scope to do additional stuff like showing a preview of the file or something else.

This directive only works for a single file, to use it for multiple files, change the model.assign line to:
{%highlight js%}model.assign(scope, element[0].files){% endhighlight %}

Let's attach this directive to our input field:

{% highlight html %}
<input type="file" file-model="myfile" name="document" required />
{% endhighlight %}


Whenever the user selects a file, it's stored in the controllers `$scope.myfile` variable.
We'll automatically upload the file to our server after the user selects it:

{% highlight js %}
angular.module('yourApp')
  .controller('FileCtrl', function ($scope, $http) {
    $scope.myfile = null;
    $scope.$on("file:set", function(){
      if ($scope.myfile){
        uploadFile.then(function(){
          alert("file uploaded");
        }, function(){
          alert("oops. There was an error uploading your file");
        });
      }
    });

    var uploadFile = function(){
      var uploadEndpoint = "/api/v1/file/upload";
      var formData = new FormData();
      formData.append('file', $scope.myfile);
      return $http.post(uploadEndpoint, formData, {
        transformRequest: angular.identity,
        headers: {
          'Accept': 'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;image/webp,*/*;q=0.5',
          'Content-Type': undefined
        }
      });
    }
  });
{% endhighlight %}

That's it. I'll upload the full sourcecode to github after I cleaned the sourcecode.