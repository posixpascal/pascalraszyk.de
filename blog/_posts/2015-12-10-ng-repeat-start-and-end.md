---
title:  "ng-repeat-start & ng-repeat-end"
date:   2015-12-10 10:18:00
description: Quick note on how to use ng-repeat-start & ng-repeat-end
tags:
- javascript
- angular
---

Ever struggled when using `ng-repeat` in a table?
You might've encountered something similar to this problem right here:

{% highlight html %}
<table>
	<tbody>
		<tr ng-repeat="user in userCollection">
			<td>{{user.name}}</td>
			<td>{{user.email}}</td>
			<!-- ... -->
		</tr>
		<!-- how to insert another row here while keeping the ng-repeat consistent? -->
	</tbody>
</table>
{% endhighlight %}

Now if you wanted to add another table-row below the ng-repeat, things can get tricky.
Of course there is the (in)-famous ng-repeat **comment directive** which isn't really semantic.
It's also possible to use multiple `tbody`s in a table (yes, I looked that up. It's possible.)

**But:** if you happen to use the Bootstrap CSS Framework, you'll break the `table-striped` class. :(

### The solution?

Angular offers two incredibly helpful directives similar to `ng-repeat`: ng-repeat-start & ng-repeat-end.

You can use them like this:


{% highlight html %}
<table>
	<tbody>
		<tr ng-repeat-start="user in userCollection">
			<td>{{user.name}}</td>
			<td>{{user.email}}</td>
			<!-- ... -->
		</tr>
		<tr ng-repeat-end="user in userCollection">
			<td colspan="2">This row is displayed after every user :)</td>
			<!-- ... -->
		</tr>
		<!-- how to insert another row here while keeping the ng-repeat consistent? -->
	</tbody>
</table>
{% endhighlight %}

Angular will loop over the first `ng-repeat(-start)`, then executing    
`ng-repeat-end, then incrementing the `$index` then repeat until the index exceeds the input array. 
Pretty neat right?