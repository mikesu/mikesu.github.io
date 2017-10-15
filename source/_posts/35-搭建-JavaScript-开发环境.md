pid: 35
title: 搭建 JavaScript 开发环境
date: 2017-10-13 22:33:36
tags:
---

### 安装Nodejs和npm
nodejs是javascript的运行环境。
npm是javascript的包管理器。
安装nodejs就会同时安装npm了。
到[Node.js官方网站](https://nodejs.org/)下载最新的版本进行安装
安装目录选择c:\dev\nodejs

### 验证安装
```
c:\>node -v
v8.7.0

c:\>npm -v
5.3.0
```

### 使用淘宝npm镜像
```
c:\>npm config set registry https://registry.npm.taobao.org
```

### 新建Hello Nodejs项目!
```
c:\dev\workspaces\nodejs>mkdir hello_nodejs
c:\dev\workspaces\nodejs>cd hello_nodejs
c:\dev\workspaces\nodejs\hello_nodejs>npm init
```

### 安装mocha测试框架和chai断言库
```
c:\>npm install --save mocha
c:\>npm install --save chai
```

### 新建hello_nodejs.js
```
function helloNodejs() {
	return "Hello Nodejs!"
}

module.exports = helloNodejs;

console.log(helloNodejs());
```
### 运行hello_nodejs.js
```
c:\>node hello_nodejs.js
Hello Nodejs!
```

### 新建测试代码hello_nodejs.test.js
```
var helloNodejs = require('../hello_nodejs');
var expect = require('chai').expect;

describe('Hello Nodejs', function() {
  it('should return Hello Nodejs!', function() {
  	expect(helloNodejs()).to.equal('Hello Nodejs!');
  });
});
```

### 运行测试代码
```
$ npm test

> hello_nodejs@1.0.0 test C:\dev\workspaces\nodejs\hello_nodejs
> mocha

Hello Nodejs!


  Hello Nodejs
    √ should return Hello Nodejs!


  1 passing (0ms)

```

### 参考

[Nodejs 官方网站](https://nodejs.org)
[国内优秀npm镜像推荐及使用](http://riny.net/2014/cnpm/)
[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
[Mocha 官方网站](http://mochajs.org/)
[Chai 官方网站](http://chaijs.com/)