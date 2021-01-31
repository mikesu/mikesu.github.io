+++
slug = 15
title = "DBDesigner 4 与 MySql 5 的连接"
date = 2007-03-09T10:35:00+08:00
+++

&emsp;&emsp;DBDesigner 4 与 MySql 5 不能连接主要是驱动的原因，
到http://crlab.com/dbx/download.html 下载最新的驱动并安装，在安装路径中找到dbexpmda.dll这个文件拷贝到DBDesigner的安装路径中。 
然后下载一个最新版本的libMYSQL.dll，也拷贝到DBDesigner的安装路径中，你可以先备份原来的libMYSQL.dll。
好了，一切驱动准备好后，打开DBDesigner，新建了一个连接，在Advanced选项中把GetDriverFunc的getSQLDriverMYSQL改为getSQLDriverMySQL，就是把Y改为小写的y。 
然后把LibraryName的改为dbexpmda.dll。 这样就可以连接数据库了。