---

layout: post
title: How To Always Get The Topmost View Controller The Swifty Way
description: Getting the currently displayed view controller is not always as easy as asking the navigation controller what it's presenting. Here is how to recurse yourself all the way to the top view controller.
tags: iOS

---

I have recently been working on a number of custom alert view controllers. These are usually presented from *inside*  another view controller using:

{% highlight swift %}
someViewController.present(alert, animated: true, completion: nil).
{% endhighlight %}

However it's much nicer if these alerts can be called and presented from anywhere in the codebase. The `UIWindow` extension below uses recursion and always returns the controller on top.

{% highlight swift %}
extension UIWindow {

    func topMostViewController() -> UIViewController? {
        guard let rootViewController = self.rootViewController else {
            return nil
        }
        return topViewController(for: rootViewController)
    }

    func topViewController(for rootViewController: UIViewController?) -> UIViewController? {
        guard let rootViewController = rootViewController else {
            return nil
        }
        guard let presentedViewController = rootViewController.presentedViewController else {
            return rootViewController
        }
        switch presentedViewController {
        case is UINavigationController:
            let navigationController = presentedViewController as! UINavigationController
            return topViewController(for: navigationController.viewControllers.last)
        case is UITabBarController:
            let tabBarController = presentedViewController as! UITabBarController
            return topViewController(for: tabBarController.selectedViewController)
        default:
            return topViewController(for: presentedViewController)
        }
    }

}
{% endhighlight %}

Very Swifty looking and should cover all bases with the `UINavigationController` and `UITabBarController` checks. Alerts can now be called anywhere in the code like so:

{% highlight swift %}
guard let currentViewController = UIApplication.shared.keyWindow?.topMostViewController() else {
            return
        }
currentViewController.present(alert, animated: true, completion: nil).
{% endhighlight %}

Thanks for reading. Feel free to follow me on Twitter if it was useful! :smile:
