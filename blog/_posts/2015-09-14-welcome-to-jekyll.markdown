---
layout: post
title:  "Da Toni - Making Of"
date:   2015-09-14 21:55:36
categories: datoni code rails ionic javascript angular api raspberry
---

In February 2015 I managed to get up and do one of my friends an honor by writing
a mobile application for our local restaurant. Basically you can choose from a
variety of products ranging from salads to pizza and order them right within the app.

I usually started hacking a functional prototype together using __Ruby on Rails__ as my backend REST API and Cordova.
Possible alternatives (at the time of writing) were Xamarin, RubyMotion or React Native (iOS only) but neither of these are free (as in free beer) and support iOS & Android respectively.

Let's start by getting the biggest problems solved first:

### How the hell can I receive the orders?

After a bit of research I ordered this little b\*st\*rd:

![The good ol' raspberry](http://cnet2.cbsistatic.com/hub/i/r/2014/07/14/e65601b4-e72c-4b0a-9b2e-e4b163627eb9/resize/770x578/1ceb749d00e60f666bd21dfe220f4858/raspberry-pi-b-plus1.jpg)

A raspberry PI (first edition afaik), a thermo printer and a bunch of cables to connect everything with the Internet. The printer is connected through USB and doesn't require any additional setup (I didn't even need to install CUPS).

Linux automa\(g\|t\)ically mounts the printer to **/dev/usb/lp0** and thanks for UNIX _Everything Is A File_ principle, I was able to print any string by simply piping `echo` to the lp0-file.

{% highlight ruby %}
open("/dev/usb/lp0", "w") do |f|
  f.write "This gets printed immediately."
end
{% endhighlight %}

I wrote a little script which pulls new orders from the _REST API_ periodically every few minutes.
As soon as it receives an order, it'll pipe the order to __/dev/usb/lp0__ and play some catchy-tune to notify the restaurant about the new order.

Before a user can order something within the app, he has to verify his phonenumber (imo. this isn't needed but I did it anyway...). In the past I wrote a "free-sms-website" with __SMSTrade.de__ as my API of choice.

They offer various gateways to send SMS to any number with a fixed price (I think it's 1 cent per SMS, not sure tho).
This is my `send_sms` implementation:

{% highlight ruby %}
def send_sms(targets, message, route='gold')
  targets.each do |target|
    open(
      "http://gateway.smstrade.de/?key=<myapitoken>\
          &to=#{target}\
          &from=Da+Toni+App&message=#{message}\
          &route=#{route}"
     ,"r")
  end
end
{% endhighlight %}



To be continued.
