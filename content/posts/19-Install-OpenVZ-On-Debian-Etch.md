+++
slug = 19
title = "Install OpenVZ On Debian Etch"
date = 2007-11-11T14:02:00+08:00
+++

昨天经同事介绍有个比较好的虚拟机。OpenVZ，昨夜试了一下，成功了，故和大家分享。
主要参考OpenVZ的官方文档做的。http://wiki.openvz.org/Installation_on_Debian  
1. 首先修改/etc/apt/sources.list增加deb源。  
	`deb http://download.openvz.org/debian etch main`  
1. 更新包列表  
	`apt-get update`  
1. 搜寻已经修改过的Linux核心。  
	`apt-cache search linux-image-2.6.18-openvz`  
1. 安装修改过的Linux核心。我这里用的是linux-image-2.6.18-openvz-13-1etch4-486  
	`apt-get install linux-image-2.6.18-openvz-13-1etch4-486`  
1. 再次修改/etc/apt/sources.list增加deb源  
	`deb http://debian.systs.org/ etch openvz`  
1. 加入deb源的认证  
	`wget http://debian.systs.org/dso_archiv_signing_key.asc -q -O - | apt-key add -`

1. 再次更新包列表  
	`apt-get update`  
1. 修改/etc/network/interfaces，在网卡设置的下面加入
	```
	up sysctl -w net.ipv4.conf.%DEV%.proxy_arp=100  
	pre-down sysctl -w net.ipv4.conf.%DEV%.proxy_arp=0  
	```  
1. 重新启动系统并进入openVZ内核的系统  
	`reboot`  
1. 安装openVZ的工具和debian模板  
	`apt-get install vzctl vzquota vzdump vzctl-ostmpl-debian`

1. 确认安装成功通过ifconfig查看有没有新的venet，如果存在表示成功了。
1. 创建虚拟系统  
    查看/var/lib/vz/template/cache，找到模板，命令7主要是分配内存给新的虚拟系统的。

    ```
	vzctl create 103 --ostemplate debian-4.0-i386-minimal --config vps.basic   
	vzctl set 103 --onboot yes --save   
	vzctl set 103 --hostname test103.mytest.org --save   
	vzctl set 103 --ipadd 10.0.0.103 --save   
	vzctl set 103 --numothersock 120 --save   
	vzctl set 103 --nameserver 10.0.0.2 --save   
	vzctl set 103 --privvmpages 500000:750000 --save  
	vzctl start 103  
	vzctl exec 103 passwd
    ```  
1. 这要就完成了虚拟系统的安装，通过ssh 10.0.0.103就可以连接到新的虚拟系统上了。