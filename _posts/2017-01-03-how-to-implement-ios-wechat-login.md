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
As there are several Objective-C header (.h) files we need to add them to our projects Bridging Header file like so:
{% highlight swift %}
#import "WXApi.h"
{% endhighlight %}

Next go to the *General* tab and scroll down to *Linked Frameworks and Libraries* and add the following:


* libc++.tbd
* CoreTelephony.framework
* libsqlite3.tbd
* libz.tbd
* SystemConfiguration.framework
* libWeChatSDK.a

Finally we need to add the URL Scheme. Just go to the *Info* tab in your project and expand *URL Types*. Add a type with the identifier *weixin* and the *URL Schemes* set to the WeChat AppID you got when registering your app.

![WeChat URL Scheme]({{ site.url }}/assets/images/wechat-url.png)
