pid: 27
title: Pelican支持Swiftype搜索
date: 2014-10-28 14:57:11
tags:
---
### 引言

一般的动态博客系统都提供了搜索功能，但是对于静态博客来说就必须借助外部系统来完成搜索的功能了。
Google和Baidu都提供了站内搜索的功能，但是他们有明显缺点：

1. 提供的搜索界面和博客网站是完全分离的，很难整合在一起。
1. 搜索界面非常难看，而且不能修改样式。
1. 没有提供个性化的搜索结果管理，例如人工干预排序
1. 国内来说Google被墙，几乎无法使用，Baidu的搜索结果一直不敢恭维。

现在有一款产品 Swiftype试图解决这个问题。 这款产品能够为任意网站提供个性化的搜索结果管理。什么意思呢？网站所有者可以根据信息的重要程度，通过 Swiftype 的“排序控制”功能将重要的搜索结果排到前面，并将不重要的结果移除或者挪到后面。那么用户在网站输入关键词搜索时，显示的内容排序也会跟网站所有者的预期是一样的。

### 获取Swiftype嵌入代码

到[Swiftype](https://swiftype.com/)注册自己的账号。并创建一个搜索引擎。
设置代码
{% asset_img swiftype_setp_1.jpg %}
获取代码
{% asset_img swiftype_setp_2.jpg %}
复制代码
{% asset_img swiftype_setp_3.jpg %}

### 修改pelican-octopress-theme模板

1.找到\pelican-octopress-theme\templates\base.html文件，在`<head></head>`里面加入下面代码
```
{% if SWIFTYPE_SCRIPT %}
    {{ SWIFTYPE_SCRIPT }}
{% endif %}
```

2.找到\pelican-octopress-theme\templates_includes\navigation.html文件，在{% raw %}{% if SEARCH_BOX %}{% endraw %}
代码块下面加入
```
{% if SWIFTYPE_SCRIPT %}
<form>
    <fieldset role="search">
        <input class="search" type="text" id="st-search-input" placeholder="Search"/>
    </fieldset>
</form>
{% endif %}
```

3.添加\pelican-octopress-theme\templates\search.html文件
```
{% extends 'base.html' %}
{% block content %}
{% set index=True %}
<div class="blog-index">
    <div id="st-results-container" style="padding: 20px;">
        &nbsp;
    </div>
</div>
{% endblock %}
```

### 修改pelicanconf.py文件
```
TEMPLATE_PAGES = {'search.html': 'search.html'}

SWIFTYPE_SCRIPT ='''[粘贴swiftype代码]'''
```

重新生成网站
```
$pelican content
```

### 测试
如果一切顺利的话，在导航栏会出现搜索框，输入关键字试试吧。