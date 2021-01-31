+++
slug = 18
title = "FactoryBean"
date = 2007-09-13T22:34:00+08:00
+++

&emsp;&emsp;其实实现了FactoryBean接口的Bean，就是一个Bean Factory。例如下面，对这个userCacheBackend的引用，并不是队Bean Factory的引用，而是引用这个Bean Factory所生产出来的Bean。

```xml
<bean id="userCacheBackend" class="org.springframework.cache.ehcache.EhCacheFactoryBean">  
    <property name="cacheManager" ref="cacheManager"/>  
    <property name="cacheName" value="userCache"/>  
</bean> 
```
