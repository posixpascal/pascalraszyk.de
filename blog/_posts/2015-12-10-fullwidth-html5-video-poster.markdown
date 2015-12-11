---
title:  "Fullwidth HTML5 Video Poster"
date:   2015-12-10 10:18:00
description: Generate a fullwidth HTML5 Video Poster with CSS
tags:
- html5
- css
- workarounds
---

Did you use the HTML5 `video` tag yet? If not I suggest you to take a look into it.
Maybe you've already discovered the following situation:

You're told to include an HTML5 Video into a client's website so you grab your toolchain and decide to use latest HTML5 technology:

{% highlight html %}
<video controls="1">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>
{% endhighlight %}

So far so good. But wait, if you view the video right now in the browser, you'll see the first frame as the video poster. This is not always desired but a quick look into the [MDN Docs][mdnvideo] will solve this issue using the `poster` attribute.

#### From the docs:

> A URL indicating a poster frame to show until the user plays or seeks. 
> If this attribute isn't specified, nothing is displayed until the first frame is available; 
> then the first frame is shown as the poster frame.

Alright, so let's add the poster attribute to our video tag
{% highlight html %}
<video controls="1" poster="https://unsplash.it/200x400?random">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>
{% endhighlight %}

Finally, our video tag might look like this:

<video style="width: 100%; height: 200px;" controls="1" poster="https://unsplash.it/200x400?random">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>

The problem here is that our poster image is actually centered and doesn't cover the full video.

To have a fullwidth video poster, we have to use `CSS`. Unfortunately we can't address the poster image with css (yet).
We can, however, apply a `background-image` attribute to our video like this:

{% highlight css %}
video {
	background-image: url("http://unsplash.it/200x400");
	background-size: cover;
}
{% endhighlight %}

<video style="width: 100%; height: 200px;background-image: url('https://unsplash.it/520x200?t=2&random');background-size: cover;" controls="1" poster="https://unsplash.it/520x200?t=25&random">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>

Damn it. Now the poster is blocking our background image. So let's remove our poster attribute again.
(Someone on StackOverflow suggested to use a transparent image for the poster. Maybe this solves some cross browser issues.).

{% highlight html %}
<video controls="1">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>
{% endhighlight %}

And finally we get a nice full width video poster. Have fun.

<video style="width: 100%; height: 200px;background-image: url('http://unsplash.it/520x200?t=2&random');background-size: cover;" controls="1">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>

You can grab the full code here:


{% highlight html %}
<style>
	video {
		background-image: url("http://unsplash.it/200x400");
		background-size: cover;
	}
</style>


<video controls="1">
	<source 
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2" 
		src="your-video.mp4" />
	<!-- other formats -->
	<noscript>Fallback for legacy browsers</noscript>
</video>
{% endhighlight %}

I hope browser vendors add pseudo selector support for the poster attribute like:

{% highlight css %}
	video::poster {
		/* do something with the poster */
	}
{% endhighlight %}

[mdnvideo]:    https://developer.mozilla.org/en/docs/Web/HTML/Element/video

