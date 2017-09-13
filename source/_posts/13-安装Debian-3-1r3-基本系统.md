pid: 13
title: 安装Debian 3.1r3 基本系统
date: 2007-02-06 09:44:00
tags:
---

用debian-31r3-i386-netinst.iso来安装。 
选择简体中文，所在地区是中国，键盘时美国英语。 
输入主机名debian26，域名antiparticle.org。 
选择分区，一般来说交换分区的大小和内存一样，这里用默认值。 
然后安装程序开始拷贝文件。 
确定把GRUB写到MBR。选择是。 
安装完成提示取出光盘重新启动。选择继续。 
选择是否用格林威治时间。选择否。 
选择时区。选择asia/shanghai。 
输入root密码。 
新建用户和设定密码。 
设置apt的连接方式，选择http。 
设置镜像所在国家，选择中国。 
选择镜像，选择debian.cn99.com。 
更新apt源。 
选择安装Debian软件。这里选择手动选择软件。 
自动进入aptitude，然后按q，退出。 
设置Exim，选择互联网站。 
设置root和postmaster的邮件的收件人，用mikesu 
最后确定，就完成debian的安装。