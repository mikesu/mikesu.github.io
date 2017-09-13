pid: 3
title: 我的Thinking in Java 3rd 的学习笔记
date: 2006-01-05 17:08:00
tags:
---

&emsp;&emsp;很久以前就申请了这个blog但是一直我都很懒，没有写过东西，今天终于鼓起勇气，写了一篇。希望在以后的日子写下我得学习笔记，我的心情。
重装了电脑，装了 java sdk 1.5.0_06、eclipse 3.1.1。准备把书上的例子都自己实现一次，书上是用作者的单元测试方法的，而我打算用Junit。这样比只是在网上下载源代码运行一遍来到有意义。

&emsp;&emsp;由于没有经验，搭建开发环境折腾了一个晚上。本来想的是Eclipse 3.1.1+JBossIDE 1.5+lomboz 3.1RC2，但是发现装完后在eclipse->窗口->首选项中没有Lomboz的选项，我以为我自己没有成功，试了几次都不行。我开始以为是Lomboz 3.1RC2不兼容Eclipse 3.1.1，所以我改用Eclipse3.0.1+JBossIDE 1.4+Lomboz 3.0.1，但是还是没有出现Lomboz的选项。我于是在CSDN上找答案，终于找到了http://blog.csdn.net/rickhunterchen/archive/2005/09/11/477382.aspx 。原来我第一次就是对的。后来我发现Lomboz用了很多Eclipse WTP的组件包括JST和WST，而且版本是0.7。

&emsp;&emsp;我开始查WTP是什么东西，在Eclipse的网上，我看见了有1.0版本，我是追新的人。我就看了一些介绍WTP的文章，我就决定放弃Lomboz和JBossIDE了，始终WTP是一个插件总比两个好一点，而且是Eclipse的官方插件，用起来放心。而且以后肯定会有汉化包，现在只有0.71版有汉化包。http://www.eclipse.org/webtools/ 上有下载，建议大家下载All in one 版，它包含了Eclipse，下载解压就能用，下载地址是http://download.eclipse.org/webtools/downloads/drops/R-1.0-200512210855/wtp-all-in-one-sdk-1.0-win32.zip 。里边包括了Eclipse 3.1.1、emf-sdo-xsd-SDK-2.1.1、GEF-SDK-3.1.1、和JEM-SDK-1.1.0.1。想要汉化就分别找到这些对应的语言包进行汉化。

这里有一些WTP的参考资料：http://www.eclipse.org/webtools/community/communityresources.html

Eclipse 3.1.1的汉化在这里：http://www.eclipse.org/org/press-release/20051012nlscb.html。