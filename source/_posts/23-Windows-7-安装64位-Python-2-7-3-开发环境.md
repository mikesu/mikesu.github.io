pid: 23
title: Windows 7 安装64位 Python 2.7.3 开发环境
date: 2013-03-04 23:58:00
tags:
---
1. 安装Python 2.7.3
	下载http://python.org/ftp/python/2.7.3/python-2.7.3.amd64.msi 
	安装到 D:\Python\python27 目录下面 
	设置 d:\Python\python27 和 D:\Python\Python27\Scripts 到环境变量Path中 
1. 安装Setuptools
	下载http://peak.telecommunity.com/dist/ez_setup.py 到 D:\Python 
	安装，进入命令行 
	`d:\Python>python ez_setup.py`
1. 安装 pip 
	下载 https://raw.github.com/pypa/pip/master/contrib/get-pip.py 到 D:\Python 
	安装 ，进入命令行 
	`d:\Python>python get-pip.py`
1. 安装 virtualenv 
	由于已经安装了pip，我们就可以直接在命令行下用pip install virtualenv进行安装了。 
	安装，进入命令行 
	`d:\Python>pip install virtualenv`