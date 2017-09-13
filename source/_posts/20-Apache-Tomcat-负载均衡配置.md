pid: 20
title: Apache Tomcat 负载均衡配置
date: 2008-01-18 23:16:00
tags:
---

&emsp;&emsp;同一台服务器上运行Apache和两个tomcat来做负载均衡，不做集群。所以不需要session复制，但是需要session的粘住。

&emsp;&emsp;系统是用Debian。所以配置文件的位置可能和其它Linux发行版有所不同。还有就是已经配置好了Apache Tomcat的整合的基础上做的修改
 
修改 /etc/apache2/mods-available/jk.conf
```
# 将所有servlet 和jsp请求通过ajp13的协议送给Tomcat，让Tomcat来处理
JkMount /*.do  router
JkMount /*.jsp router
```
&emsp;&emsp;这里的router其实是负载均衡的worker，不是实际的worker。在下面配置workers.properties可以可以清楚看到。
```
worker.list=router
worker.worker1.type=ajp13
worker.worker1.host=localhost
worker.worker1.port=8009
worker.worker1.lbfactor=1

worker.worker2.type=ajp13
worker.worker2.host=localhost
worker.worker2.port=8010
worker.worker2.lbfactor=1

worker.router.type=lb
worker.router.balance_workers=worker1,worker2
```

&emsp;&emsp;根据tomcat的官方文档默认是打开Session粘住的，另外worker.list只需router其他的worker不需要列出。并且在balance_workers属性中的worker必须不能在worker.list中出现。所以这里只列出了router，如果其他的worker也列出，我没有试过，不知能否成功。

配置 tomcat的server.xml 作用主要是为apache提供Session粘住。
把 `<Engine name="Catalina" defaultHost="localhost">`

改为`<Engine name="Standalone" defaultHost="localhost" jvmRoute="worker1">`

&emsp;&emsp;把另外一个tomcat的server.xml也按上面的方法修改，但是jvmRoute="worker2" 。这里的jvmRoute就是对应workers.properties配置文件中的两个worker。名字必须对应。只是Session粘住的关键。
 
全部配置完成。重启所以tomcat和Apache。
 
 