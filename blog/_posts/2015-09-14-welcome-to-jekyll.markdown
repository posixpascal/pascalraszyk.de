---
layout: post
title:  "Da Toni - Making Of"
date:   2015-09-14 21:55:36
categories: datoni code rails ionic javascript angular api raspberry
---

In February 2015 I managed to get up and do one of my friends an honor by writing
a mobile application for our local restaurant. Basically you can choose from a
variety of products ranging from salads to pizza and order them right in the app.

The biggest problem in this scenario is, how can I inform the restaurant in realtime
that a new order was placed within the app. I came up with a fairly simple solution:

![The good ol' raspberry](http://cnet2.cbsistatic.com/hub/i/r/2014/07/14/e65601b4-e72c-4b0a-9b2e-e4b163627eb9/resize/770x578/1ceb749d00e60f666bd21dfe220f4858/raspberry-pi-b-plus1.jpg)

I ordered a raspberry PI (first edition afaik), a thermo printer and a bunch of cables to connect everything with the Internet. The printer is connected through USB and doesn't require any additional setup (I didn't even install CUPS).

Linux automa\(g\|t\)ically mounts the printer to **/dev/usb/lp0** and thanks for UNIX _Everything Is A File_ principle, I was able to print any string by piping `echo` to the lp0-file.

{% highlight ruby %}
open("/dev/usb/lp0", "w") do |f|
  f.write "This gets printed immediately."
end
{% endhighlight %}

I wrote a little script which pulls new orders from the _REST API_ periodically every few minutes.
As soon as it receives an order, it'll print the order and play some catchy-tune.

I needed to buy another fancy gadget to play audio files with the PI but that's another story. 

To be continued.
