---

layout: post
title: How To Implement WeChat Login In iOS Swift
description: Here we can see the description in the post.
tags: iOS

---

I was recently given the challenge of implementing WeChat login for my company's app. For anyone who isn't familiar, WeChat is China's most popular mobile messaging app similar to the likes of
WhatsApp and Facebook Messenger. WeChat also has a huge number of additional features such as payments, mobile account top up and bots. It essential for daily life in China and is a great alternative login (as Facebook is blocked in China!) for any app. Figuring out how to set this up proved pretty tricky due to the English version of the docs/SDK not really giving the full picture, but this is how I did it:

#### 1 - Setup the WeChat SDK:

Firstly you will need to apply for a WeChat ID, the English site is at <http://open.wechat.com> and the Chinese: <http://open.weixin.qq.com>. It may only be possible to get the ID using the Chinese site so you will need to enlist the help of a Chinese speaker or Google Translate :stuck_out_tongue_winking_eye:. Now there are also two different versions of the SDK, the Chinese and English version. **Forget** the English version, I found it wasn't as current as the Chinese one and actually missing some of the important methods needed to get the login working. Get the latest Chinese version [here](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419319164&token=&lang=zh_CN) which is 1.7.5 at the time of writing. Copy the files into your project folder and create a new group for organization sake.

![File organization]({{ site.url }}/assets/images/wechat-organized.png)
As there are several Objective-C header (.h) files we need to add them to our projects Bridging Header file like e.g. `#import "WXApi.h" `

Next go to the *General* tab and scroll down to *Linked Frameworks and Libraries* and add the following:


* libc++.tbd
* CoreTelephony.framework
* libsqlite3.tbd
* libz.tbd
* SystemConfiguration.framework
* libWeChatSDK.a

We also need to add the URL Scheme. Just go to the *Info* tab in your project and expand *URL Types*. Add a type with the identifier *weixin* and the *URL Schemes* set to the WeChat AppID you got when registering your app.

![WeChat URL Scheme]({{ site.url }}/assets/images/wechat-url.png)

Finally right click on the `Info.plist` and edit source to look like so:
{% highlight swift %}
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>weixin</string>
</array>
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
{% endhighlight %}

This is necessary because iOS9 limits HTTP access.


#### 2 - Using the API

We need to first add some code to `AppDelegate.swift`:

{% highlight swift %}
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, WXApiDelegate {

    var window: UIWindow?


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {

        // WeChat: use your AppID
        WXApi.registerApp("wx235325325")

        return true
    }

    func application(application: UIApplication, handleOpenURL url: NSURL) -> Bool {
        return WXApi.handleOpenURL(url, delegate: self)
    }

    func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject) -> Bool {
        return WXApi.handleOpenURL(url, delegate: self)
    }

    func onReq(req: BaseReq!) {
        // Unused
    }

    func onResp(resp: BaseResp!) {
        // Where the magic happens
    }

}
{% endhighlight %}

Notice the method `func onResp(resp: BaseResp!)`, this is where the authorization code will appear that is used to make login requests. First we must request this code (this can be done anywhere in your app):

{% highlight swift %}
let req = SendAuthReq()
req.scope = "snsapi_userinfo" //Important that this is the same
req.state = "co.company.yourapp_wx_login" //This can be any random value
WXApi.sendReq(req)
{% endhighlight %}

The `scope` must be specified to `snsapi_userinfo` and the `state` is really just any identifer you would like to use. This should return a code to `func onResp(resp: BaseResp!)`. I implemented the method like so - triggering a notification:

{% highlight swift %}
func onResp(resp: BaseResp!) {

        if let authResp = resp as? SendAuthResp {

            if authResp.code != nil {

                let dict = ["response": authResp.code]
                NSNotificationCenter.defaultCenter().postNotificationName("WeChatAuthCodeResp", object: nil, userInfo: dict)

            } else {

                let dict = ["response": "Fail"]
                NSNotificationCenter.defaultCenter().postNotificationName("WeChatAuthCodeResp", object: nil, userInfo: dict)

            }

        } else {

            let dict = ["response": "Fail"]
            NSNotificationCenter.defaultCenter().postNotificationName("WeChatAuthCodeResp", object: nil, userInfo: dict)
        }
}
{% endhighlight %}

With the code we can now try and get the `openID` and the `accessToken`. To do this we need to build a link using the `appID`, `appSecret` and do a HTTP GET request. The `appID` and `appSecret` are details you get when you register the app with WeChat. Example like so:

{% highlight swift %}
private let appID = "somecode2132113"
private let appSecret = "someappsecret213123"

private let accessTokenPrefix = "https://api.weixin.qq.com/sns/oauth2/access_token?"

private func buildAccessTokenLink(withCode code: String) -> String {

        return accessTokenPrefix + "appid=" + appID + "&secret=" + appSecret + "&code=" + code + "&grant_type=authorization_code"

}
{% endhighlight %}
