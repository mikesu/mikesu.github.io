pid: 26
title: 启用免费版MarkdownPad2的Markdown扩展模式
date: 2014-10-27 14:54:05
tags:
---
### 寻找Markdown配置文件
一般在用户的数据目录，例如:
```
C:\Users\xxx\AppData\Local\MarkdownPad2\MarkdownPad2.exe_Url_xxx\2.4.4.40074\user.config
```

### 启用Markdown扩展模式
添加或者修改一些数据
```
<setting name="Markdown_Extra_ExtraMode" serializeAs="String">
    <value>True</value>
</setting>
<setting name="Markdown_MarkdownProcessor" serializeAs="String">
    <value>MarkdownExtraMode</value>
</setting>
```

### 验证Markdown扩展模式
添加表格进行验证

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
表格代码：

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```