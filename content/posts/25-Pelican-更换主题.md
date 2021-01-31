+++
slug = 25
title = "Pelican 更换主题"
date = 2014-10-24T14:42:38+08:00
+++

### pelican-themes 命令
pelican-themes是管理主题的命令工具，基本用法：

|	命令						|	描述			 |
|-------------------------------|--------------------|
|pelican-themes -h 				| 显示帮助			 |
|pelican-themes -l 				| 显示已经安装的主题 |
|pelican-themes -i [theme_path]	| 安装主题			 |
|pelican-themes -r [theme_name]	| 删除主题			 |

### 安装主题
到https://github.com/getpelican/pelican-themes 可以下载很多主题
我这里选用 [Octopress Theme for Pelican](https://github.com/duilio/pelican-octopress-theme) 下载zip，然后解压，安装：
```
pelican-themes -i /e/pelican/pelican-octopress-theme/
```

### 应用主题
到你所在站点的目录，有一个pelicanconf.py文件，添加或者修改THEME
```py
THEME = "pelican-octopress-theme"
```

### 重新生成html
```
pelican content
```