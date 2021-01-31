+++
slug = 22
title = "HelloWorld 第一个Tornado应用"
date = 2013-03-04T23:54:00+08:00
+++

1. 建立工作目录  
    `D:\python\workspace\tornado`
1. 使用Virtualenv建立虚拟环境并激活环境  
    初始化环境，进入命令行，执行  
    `D:\Python\workspace\tornado>virtualenv env`  
    激活环境，执行  
    `D:\Python\workspace\tornado>env\Scripts\activate`
1. 安装Tornado
    使用pip进行安装，进入命令行激活环境，执行  
    `(env) D:\Python\workspace\tornado>pip install tornado`
1. 编写HelloWorld.py 
    ```py
    import tornado.ioloop
    import tornado.web

    class MainHandler(tornado.web.RequestHandler):
        def get(self):
            self.write("Hello, world")

    application = tornado.web.Application([
        (r"/", MainHandler),
    ])

    if __name__ == "__main__":
        application.listen(8888)
        tornado.ioloop.IOLoop.instance().start()
    ```
1. 运行HelloWorld.py  
	`(env) D:\Python\workspace\tornado>python HelloWorld.py`
1. 测试  
	在浏览器中输入<http://localhost:8888>