+++
slug = 29
title = "绿色版Solr安装配置"
date = 2014-10-30T17:52:30+08:00
+++

&emsp;&emsp;由于Solr可以用Tomcat运行的，而Tomcat是用JDK运行的，可以利用JDK免安装的特点实现Solr的免安装。就是通过配置整合JDK、Tomcat、Solr，实现一次配置好后，打包成tar包，就可以方便在其他服务器部署。

### 前期准备
&emsp;&emsp;先到网上下载好jdk,tomcat,solr。下面使用jdk-7u45-linux-x64.tar.gz, apache-tomcat-7.0.42.tar.gz, solr-4.5.0.tgz进行介绍。

解压下载的文件
```
# tar xzvf jdk-7u45-linux-x64.tar.gz
# tar xzvf apache-tomcat-7.0.42.tar.gz
# tar xzvf solr-4.5.0.tgz
```

### 直接采用tomcat的目录结构最终整合的目录solr
```
# mv apache-tomcat-7.0.42 solr
```

### 把JDK移动到solr目录
```
# mv jdk1.7.0_45 solr/jdk
```

### 拷贝solr的war包到webapps目录
```
# cp solr-4.5.0/dist/solr-4.5.0.war solr/webapps/solr.war
```

### 配置Solr的日志依赖lib和配置文件log4j.properties
```
# cp solr-4.5.0/example/lib/ext/* solr/lib/
# cp solr-4.5.0/example/resources/log4j.properties solr/lib/
```

### 创建solr home目录并配置solr.xml
```
# mkdir solr/cores
# cp solr-4.5.0/example/solr/solr.xml solr/cores
```

### 修改启动脚本
```
# nano solr/bin/startup.sh
```

把以下代码加到startup.sh里面的#!/bin/sh下面
```sh
if test ${0:0:1} = '/'
then
    ABS_PATH=`dirname $0`/..
else
    ABS_PATH=`pwd`/`dirname $0`/..
fi
export JAVA_HOME=$ABS_PATH/jdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=$JAVA_HOME/lib:$CLASSPATH
export JAVA_OPTS="$JAVA_OPTS -Dsolr.solr.home=$ABS_PATH/cores/ -Dsolr.log=$ABS_PATH/logs/"
```

### 修改tomcat的server.xml
```
# nano solr/conf/server.xml
```

找到
```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"/>
```

修改为
```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" URIEncoding="UTF-8"/>
```

到此所有配置已经完成，通过启动脚本启动solr。访问 http://[server ip]:8080/solr 测试是否配置成功。