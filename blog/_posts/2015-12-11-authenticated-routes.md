---
title:  "Authenticated Routes in Angular.js"
date:   2015-12-11 10:18:00
description: Generate authenticated routes only logged in users can access
tags:
- angular
- rest
---

Nearly 99% of all web applications need some kind of user management. Most of the time you'll end up writing an user management on the backend side, then implementing restrictions to the client side.
With `angular`, the latter is easy as pie. I'll use the excellent `ui-router` library in this example, because it uses states, is easily configurable and allows custom data for each routes.

In this post I'll create a really simple example angular app which receives it's data from a REST API.
It's important to note that the REST API should use Authorization or a similar technology to restrict certain access to users, since it's easy to extract the single admin views & the URLs to modify certain resources.

In addition I will only share code which I think is worth sharing or just reuqired to make it work, so let's dive right in.

Imagine the following route setup:

{% highlight js %}
// somewhere in angular.config

$stateProvider
    .state('auth', {
      url: '/auth',
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })

    .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

    .state('admin', {
      url: '/admin',
      abstract: true,
      template: '<ui-view></ui-view>',
    })

    .state('admin.users', {
    	url: '/users',
    	template: 'views/admin/users.html',
    	controller: 'AdminCtrl'
    })
{% endhighlight %}

So far so good. As you can see we've setup 4 routes, one for authentication (named `auth`), another one for the main view (named `home`) and two routes for the admin section.
You might've noticed that we're building the admin interface right into our angular app because we don't want to mess with an additional admin interface in our rest API.

Right now, any user can access the admin view. Even if access to certain actions is restricted, they might still see how our admin interface is structured. That's not always desired, so let's modify our routes to include a new parameter called `authentication`:



{% highlight js %}
// somewhere in angular.config

$stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      template: '<ui-view></ui-view>',
      data: {
		authentication: 'required'
  	  }
    })

    .state('admin.users', {
    	url: '/users',
    	template: 'views/admin/users.html',
    	controller: 'AdminCtrl'
    })
{% endhighlight %}

Neat. But it doesn't actually change anything. We have to implement an event which looks whether or not the route requires authentication.
I've implemented this in a service, but for the sake of simplicity, I'll just write it into the `angular.module(..).run` section:


{% highlight js %}
	// listens for ui-routes state changes:
	$rootScope.$on('$stateChangeStart', function(event, toState){
	    if (toState.data && toState.data.authentication === "required" && !user.isLoggedIn()){
	       	$state.go('auth');   
	       	 event.preventDefault(); 
	    });
  	});

  {% endhighlight %}

All you need is to implement the `user.isLoggedIn` method. I'll show you how to do this in another post. Unfortunately I'm on a short timespan at the moment.