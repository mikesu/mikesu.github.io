pid: 30
title: Boot2docker通过VirtualBox Guest Additions实现目录共享
date: 2014-10-30 17:56:07
tags:
---
&emsp;&emsp;由于boot2docker官方的iso是无法安装VirtualBox Guest Additions的。于是我找了一个集成了VirtualBox Guest Additions的iso。
下载地址：http://static.dockerfiles.io/boot2docker-v1.2.0-virtualbox-guest-additions-v4.3.14.iso

### 使用方法：

1. 关闭boot2dokcer
	```
	$ boot2docker stop
	```
1. 替换boot2docker.iso，对于windows平台应该是在用户文件夹里的.boot2docker目录
1. 用VM VirtualBox 管理器启动设置共享目录。注意：名字必须为home，否则共享不会成功的。
	{% asset_img virtualbox_guest_additions_share.png %}
1. 通过boot2docker up启动，查看/Users 目录。验证是否成功。

### 参考资料
原版：https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c
中文版：https://www.dockboard.org/boot2docker-together-with-virtualbox-guest-additions/
关于官方推荐的共享方式的讨论：https://github.com/boot2docker/boot2docker/pull/284