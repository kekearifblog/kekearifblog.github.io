---
author: Keke Arif
pubDatetime: 2023-13-12T12:16:00Z
title: HabitTapp
postSlug: habittapp-ios-app
featured: true
draft: false
tags:
  - swiftui
  - combine
  - core-data
  - habittapp
ogImage: "/assets/habittapp/habittapp-og.png"
description:
  Introducing HabitTapp, a habit tracking app written completely in SwiftUI with Combine.
---

I'm excited to introduce HabitTapp, a habit tracking app written entirely in SwiftUI with the added power of Combine.

<div class="flex overflow-x-auto">
    <img class="w-2/5 mr-3 border-0" src="/assets/habittapp/screenshot-1.jpg">
    <img class="w-2/5 mr-3 border-0" src="/assets/habittapp/screenshot-2.jpg">
    <img class="w-2/5 mr-3 border-0" src="/assets/habittapp/screenshot-3.jpg">
    <img class="w-2/5 mr-3 border-0" src="/assets/habittapp/screenshot-4.jpg">
</div>

This project allowed me to refine my skills with new technologies, while also expanding my knowledge of SwiftUI. To ensure a seamless user experience, I utilized Core Data for efficient data persistence, enabling an organized approach to storing and retrieving user data within the app.

To ensure a clean architecture and efficient code structure, I implemented the MVVM coordinator pattern with dependency injection using [Swinject](https://github.com/Swinject/Swinject). This approach allowed for a more streamlined development process, making it easier to manage complex view hierarchy and navigation.

Overall, working with SwiftUI was a highly enjoyable experience for me. Compared to UIKit, SwiftUI proved to be an incredibly productive tool, requiring far less boilerplate code to achieve the same results. However, there are a few quirks with SwiftUI, such as missing functionality for touch events and content offset scrolling in scroll views.

Additionally, there are times when the framework may not work as expected unless you follow Apple's recommended design patterns. For instance, while Apple's forms offer useful functionality, the inability to customize cell styling can limit its effectiveness for certain design requirements.

Despite these limitations, I believe that SwiftUI represents the future of Apple's UI platform and is already mature enough to serve as the go-to framework for UI development. I have confidence that missing functionality will be added in the future, and I encourage designers to remain flexible in the meantime, as the potential of SwiftUI is truly remarkable.

---

HabitTapp is the weekly habit tracking app that strips away complexity and keeps you on track. Track your habits in a beautiful, minimalistic UI design. Create a habit, assign a color to it, and mark it as complete by tapping on the corresponding day. Earn streaks by consistently completing your habits and view your stats and history. Features include:

* Minimalistic design with color-coordinated screens
* Streaks are highlighted when your weekly targets are met
* Smart reminder so you never miss a chance to complete your goals
* View your stats and history for each habit
* Reverse the date order to match your phone holding hand preferences
* Option to prevent editing of past dates
* Supports dark and light mode

<a href="https://apps.apple.com/gb/app/habittapp/id1667876040">
    <img class="border-0" src="/assets/appstore.png" width="180px">
</a>