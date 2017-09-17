pid: 31
title: docker 使用代理连接 Docker Hub
date: 2014-10-30 17:57:23
tags:
---
&emsp;&emsp;由于网络和墙的原因，直接连接Docker Hub是非常慢的，有时候还连接不上。所有我们经常需要通过代理来连接Docker Hub。下面用10.125.156.21:8118作为代理进行举例，实际操作时候请修改。

### Linux下使用 HTTP 代理连接 docker 中央服务器
如果你的宿主操作系统是 linux 那方法就很简单了，直接通过命令来启动服务即可。
```
$sudo HTTP_PROXY=10.125.156.21:8118 HTTPS_PROXY=10.125.156.21:8118 docker -d
```
如果是只是临时使用可以用下面语句
```
$sudo HTTP_PROXY=10.125.156.21:8118 HTTPS_PROXY=10.125.156.21:8118 docker pull node
```

### Boot2docker 使用HTTP代理的方法
&emsp;&emsp;在Windows和Mac下使用 docker 就必须用 boot2docker 来创建一个 Virtual Box 虚拟机提供 Linux 宿主环境。这里用代理就复杂一点。
1. 登录到Virtual Box的Linux
	```
	C:\>boot2docker ssh
	```
1. 修改或者新建/var/lib/boot2docker/profile
	```
	$sudo vi /var/lib/boot2docker/profile
	```
	添加一下内容，如果不需要正通过#来注释掉
	```
	export HTTP_PROXY=10.125.156.21:8118
	export HTTPS_PROXY=10.125.156.21:8118
	```
1. 重启docker服务
	```
	$sudo /usr/local/etc/init.d/docker restart
	```

### 参考
http://lostjs.com/2014/02/26/docker-behind-gfw/
