pid: 34
title: Java RMI远程调用简单示例
date: 2014-11-21 18:26:33
tags:
---
### 一、RMI简介
&emsp;&emsp;RMI是Java的一组用于开发分布式应用程序的API。RMI使用Java语言接口定义了远程对象，它集合了Java序列化和Java远程方法协议(Java Remote Method Protocol)。简单地说，这样使原先的程序在同一操作系统的方法调用，变成了不同操作系统之间程序的方法调用。RMI可以分为两部分，客户端和服务端。服务端就是提供服务的，而客户端就是使用服务的。

### 二、使用原生API开发RMI
#### RMI服务端
首先定义一个远程接口
RMI远程接口必须继承Remote接口，而且每一个方法都必须定义抛出RemoteException。
```
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface HelloRmi extends Remote {
    public String hello(String name) throws RemoteException;
}
```

实现该远程接口
RMI远程接口最简单的实现方法是继承UnicastRemoteObject并实现自己定义的远程接口，使用Naming.bind发布服务。
```
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.server.UnicastRemoteObject;

public class HelloRmiImpl extends UnicastRemoteObject implements HelloRmi {

    private static final long serialVersionUID = 8269168352188938724L;

    //由于集成了UnicastRemoteObject,必须实现一个抛出RemoteException的构造函数。
    protected HelloRmiImpl() throws RemoteException {
        super();
    }

    @Override
    public String hello(String name) throws RemoteException {
        return "Hello " + name + " ，I'm RMI！";
    }

    //启动服务
    public static void main(String[] args) {
        try {
            HelloRmi helloRmi = new HelloRmiImpl();
            //注册端口
            LocateRegistry.createRegistry(1099);
            Naming.bind("rmi://localhost:1099/helloRmi", helloRmi);
            System.out.print("HelloRmi Start!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### RMI客户端
使用Naming.lookup查找RMI服务。
```
import java.rmi.Naming;

public class HelloRmiClient {
    public static void main(String[] args) {
        try {
            //发现服务
            HelloRmi helloRmi = (HelloRmi) Naming.lookup("rmi://localhost:1099/helloRmi");
            System.out.println(helloRmi.hello("Mike SU"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 三、使用Spring开发RMI
#### RMI服务端
首先定义一个远程接口，使用Spring的好处是你的接口不需要继承java.rmi.Remote接口。
```
public interface HelloSpringRmi {

    public String hello(String name);

}
```
实现该接口
```
import org.springframework.remoting.rmi.RmiServiceExporter;

public class HelloSpringRmiImpl implements HelloSpringRmi {

    @Override
    public String hello(String name) {
        return "Hello " + name + " ，I'm Spring RMI！";
    }

    //启动Spring RMI 服务
    public static void main(String[] args) {
        try {
            //创建Spring RMI 服务
            HelloSpringRmi helloSpringRmi = new HelloSpringRmiImpl();
            //使用Spring提供的RmiServiceExporter暴露服务
            RmiServiceExporter rmiServiceExporter = new RmiServiceExporter();
            //设置 RMI 服务
            rmiServiceExporter.setService(helloSpringRmi);
            //设置 RMI 服务名称
            rmiServiceExporter.setServiceName("HelloSpringRmi");
            //设置 RMI 服务接口
            rmiServiceExporter.setServiceInterface(HelloSpringRmi.class);
            //设置 RMI 绑定端口
            rmiServiceExporter.setRegistryPort(1099);
            //启动 RMI 服务
            rmiServiceExporter.prepare();
            System.out.print("HelloSpringRmi Start!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
上面是直接使用代码来运行，也可以通过Spring的配置文件来部署服务
```
<bean id="helloSpringRmi" class="com.example.HelloSpringRmiImpl"/>

<bean class="org.springframework.remoting.rmi.RmiServiceExporter">
    <property name="serviceName" value="HelloSpringRmi"/>
    <property name="service" ref="helloSpringRmi"/>
    <property name="serviceInterface" value="com.example.HelloSpringRmi"/>
    <property name="registryPort" value="1199"/>
</bean>
```
#### RMI客户端
直接代码运行
```
import org.springframework.remoting.rmi.RmiProxyFactoryBean;

public class HelloSpringRmiClient {

    public static void main(String[] args) {
        RmiProxyFactoryBean rmiProxyFactoryBean = new RmiProxyFactoryBean();
        rmiProxyFactoryBean.setServiceUrl("rmi://localhost:1099/HelloSpringRmi");
        rmiProxyFactoryBean.setServiceInterface(HelloSpringRmi.class);
        rmiProxyFactoryBean.afterPropertiesSet();
        HelloSpringRmi helloSpringRmi = (HelloSpringRmi)rmiProxyFactoryBean.getObject();
        System.out.println(helloSpringRmi.hello("Mike SU"));
    }

}
```

配置文件部署
```
<bean id="HelloSpringRmi" class="org.springframework.remoting.rmi.RmiProxyFactoryBean">
    <property name="serviceUrl" value="rmi://localhost:1099/HelloSpringRmi"/>
    <property name="serviceInterface" value="com.example.HelloSpringRmi"/>
</bean>
```

### 四、注意事项
1. Spring开发的RMI客户端可以调用原生API开发的RMI服务端。
1. 如果服务接口继承了Remote接口，原生API开发的RMI客户端可以调用Spring开发的RMI服务端，否则不行。
1. 如果服务提供方是动态代理（Proxy.newProxyInstance）生成的，使用原生API暴露服务，客户端是无法调用的，但是如果使用Spring开发RMI的服务端，则客户端可以调用。因为Sping已经把这个情况在内部进行处理了。

### 五、建议
1. 服务接口尽量继承Remote接口，这样不管是原生API开发或者Spring进行开发，都可以兼容。
1. 服务端建议使用Spring开发，更方便一点，可以避免一些麻烦，例如上面提到的动态代理的问题。
