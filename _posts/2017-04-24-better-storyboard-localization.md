---

layout: post
title: Better Storyboard Localization in XCode with IBInspectables
description: How to localize storyboards and xib files using IBInspectables and avoid endlessly generating new .string files!
tags: iOS localization storyboard

---

Localizing xibs and storyboards in XCode can be very cumbersome. If a new UI elements are added at a later date the `.string files` have to be regenerated or the `Object ID` manually inserted to add the new translations. The biggest issue I had was trying to automate the process of adding a new language for my company's app. They would provide a new spreadsheet with the key names and strings for use with `NSLocalizedString`. This works great for anything out of the storyboards and .xibs, just copy and paste into the new `Localization.strings` file and done! :beer: What about all those translations sitting in the UI though? The first obvious option to fix this is just not localizing the files at all. All the labels, text fields, buttons and various other elements can have their IBOutlets connected to the view controller or view and have their values initialized in `viewDidLoad` or the relevant view's initializer, this makes for more mess though - which I don't like.

Luckily the magic of IBInspectables can help clean things up a bit. I first created a small extension for `UILabel` like so:

{% highlight swift %}
import Foundation

extension UILabel {

    @IBInspectable var stringId: String {
        set(value) {
            self.text = NSLocalizedString(value, comment: "")
        }
        get {
            return ""
        }
    }

}
{% endhighlight %}

This property will be inherited by all UILabels and will allow us to add a key that can be used in `Localizable.strings`. Just simply define the key name in interface builder and when the view controller or view is loaded for the first time its value will be set calling `NSLocalizedString` on the key name provided.

![String id IBInspectable]({{ site.url }}/assets/images/localization-ibinspectable.png)

Now automation is a piece of cake! I just add the key and translations to `Localizable.strings`, as for any other translation. Of course this approach will work for other UI elements too, here is `UIButton`

{% highlight swift %}
import Foundation

extension UIButton {

    @IBInspectable var stringId: String {
        set(value) {
            self.setTitle(NSLocalizedString(value, comment: ""), for: .normal)
        }
        get {
            return ""
        }
    }

}
{% endhighlight %}

You can even add an extension for `UIViewController` to add a key for the view controller title that is displayed in navigations controllers:

{% highlight swift %}
import Foundation


extension UIViewController {

    @IBInspectable var stringId: String {
        set(value) {
            self.title = NSLocalizedString(value, comment: "")
        }
        get {
            return ""
        }
    }

}
{% endhighlight %}

Thanks for reading. Please leave a comment or share if you find this article useful or if you have your own different approach to localization.
