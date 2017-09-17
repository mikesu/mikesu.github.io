pid: 33
title: 通过WebRTC实现网页间文件传输
date: 2014-11-05 18:23:34
tags:
---

这里采用PeerJS作为Signaling服务器（mikesu.herokuapp.com)。

### 接收方使用方法
1. 调用connectPeerServer，连接PeerServer。
1. 通过其他途径吧PeerId告诉发送方。
1. 等待接收文件。

### 发送方使用方法
1. 调用connectPeerServer，连接PeerServer。
1. 拿到接收方的peerId和选择文件（使用Html5的FileAPI）通过sendFile发送文件

### 代码
```
var peerServer;

function connectPeerServer(){
    //连接Peer服务器
    peerServer = new Peer({'host':'mikesu.herokuapp.com', 'port': 80,'debug':3});
    //连接成功后显示peerId
    peerServer.on('open',function(peerId){
        log('成功连接 PeerServer!');
        log('PerrId: '+peerId);
    });
    //当有文件发送过来的时候触发receiveFile函数
    peerServer.on('connection',receiveFile);
}


function receiveFile(connect){
    //在连接里面包括了一下文件的元数据
    var fileName = connect.metadata.fileName;
    var fileSize = connect.metadata.fileSize;
    var lastModifieDate = connect.metadata.lastModifiedDate;
    log('收到文件接收请求：'+fileName);
    //连接可用触发
    connect.on('open',function(){
        //确认是否接收
        var result = confirm('Receive File:'+fileName);
        log('是否接收：'+result);
        if(result){
            //这里用的了闭包哦～～～
            //收到数据后通过downloadFile保存文件
            connect.on('data',(function(f){
                return function(data){
                    log('接受到文件');
                    downloadFile(f,data);
                }
            })(fileName));
            //通知对方发生文件内容
            log('发送接收文件指令OK，');
            connect.send('ok');
        }else{
            //通知对方不接收文件
            log('发送拒绝文件指令cancel');
            connect.send('cancel');
        }
    });
}

function downloadFile(fileName,data){
    log('下载文件');
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);
    aLink.download = fileName;
    var blob = new Blob([data]);
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}

function sendFile(file,peerId){
    //构造连接元数据
    var fileMeta = {};
    fileMeta.fileName = file.name;
    fileMeta.fileSize = file.size;
    fileMeta.lastModifiedDate = file.lastModifiedDate.toDateString();
    var connectOption = {};
    connectOption.metadata = fileMeta;
    //建立 DataChannel
    var connect = peerServer.connect(peerId,connectOption);
    connect.on('open',function(){
        log('DataChannel 连接成功');
        //等待对方指令
        connect.on('data',function(data){
            log('对方指令'+data);
            //对方接受传输
            if(data=='ok'){
                var reader = new FileReader();
                reader.onload = (function(e) {
                    log('sendFile 发送文件');
                    connect.send(e.target.result);
                });
                reader.readAsArrayBuffer(file);
            }
            //对方拒绝接收
            else if(data=='cancel'){
                log('对方取消接收');
            }
            //返回命令出错
            else{
                log('指令错误');
            }
        });
    });
}
```