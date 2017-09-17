pid: 32
title: Boot2docker通过Samba实现文件夹共享
date: 2014-10-31 18:18:13
tags:
---

这是Boot2docker推荐的共享文件方法。
1. 用busybox创建Data volume containers，就是专门存储数据的容器，给他取个名字叫my-data。因为仅仅用来做存储数据，所以用busybox的image就够了，当然用其他的image也是可以的。
	```
	$ docker run -v /data --name my-data busybox
	```
1. 用svendowideit/samba创建容器把my-data共享出来
	```
	$ docker run --rm -v /usr/local/bin/docker:/docker -v /var/run/docker.sock:/docker.sock svendowideit/samba my-data
	```
1. 其他应用的容器也可以用这个共享目录了，例如：
	```
	$ sudo docker run -d --volumes-from my-data --name nginx nginx
	```
1. Windows可以访问
	```
	\\192.168.59.103\data
	```
1. Mac可以用Finder访问
	```
	cifs://192.168.59.103/data
	```
	