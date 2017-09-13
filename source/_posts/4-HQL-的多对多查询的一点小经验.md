pid: 4
title: HQL 的多对多查询的一点小经验
date: 2007-01-30 15:29:00
tags:
---

&emsp;&emsp;现在有学生和教师两个类，之间有多对多关系，通过对象关联很容易就可以得到一个学生对应的老师，那如何通过HQL来实现相同的功能或者更复杂的查询呢？例如要查询所有男学生的老师，可以用下面的HQL实现：
sql 代码

	select elements(s.teachers) from student as s where s.sex = 'man'  

这个查询可以作为子查询使用，如果没有elements，则select返回的是一个set，作为子查询就会有语法错误了。
