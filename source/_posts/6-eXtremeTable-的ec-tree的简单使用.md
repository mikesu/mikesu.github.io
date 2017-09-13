pid: 6
title: 'eXtremeTable 的ec:tree的简单使用'
date: 2007-01-31 10:50:00
tags:
---

```
<ec:tree 
    identifier="id" 
    parentAttribute="parentId" 
    items="dirList" 
    action="Dir/search.do" 
    view="org.extremecomponents.tree.TreeView" 
    filterable="false" 
    sortable="false" 
    var="dir"> 
    <ec:row> 
        <ec:column property="name" title="名称" cell="org.extremecomponents.tree.TreeCell"/> 
        <ec:column property="descripsion" title="描述"/> 
    </ec:row> 
</ec:tree>
```

&emsp;&emsp;主要是红色部分和ec:table有所不同，identifier声明了用来区别每一个对象的属性，parentAttribute用来声明对象中记录父结点的属性。关键是在cell中定义Tree的显示方式，如果不这样做就和普通的ec:table没有区别了。