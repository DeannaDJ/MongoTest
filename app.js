// var http = require("http");
//
// http.createServer(function (request, response) {
// 	// 发送 HTTP 头部
// 	// HTTP 状态值: 200 : OK
// 	// 内容类型: text/plain
// 	response.writeHead(200, {'Content-Type': 'text/plain'});
//
// 	// 发送响应数据 "Hello World"
// 	response.end('Hello World\n');
// }).listen(8080);
//
// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8080/');


//app.js 文件
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/home', function (req, res) {
   res.send('Hello dj，welcome to home！');
})

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test_mongo';

var insertData = function(db, callback) {
    //连接到表 site
    var Site = db.collection('site');
    //插入数据
    var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
    Site.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

// 删除数据
var deleteData = function(db, params, callback) {
    //连接到表 site
    var Site = db.collection('site');

    Site.remove(params, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

// 更新数据
var updateData = function(db, params, condition, callback) {
    //连接到表 site
    var Site = db.collection('site');

    Site.update(params, condition, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

// 查找数据
var findData = function(db, condition, callback) {
    //连接到表 site
    var Site = db.collection('site');

    Site.findOne(condition, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});

app.get('/delete', function(req, res) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        deleteData(db, {'name': '菜鸟教程'}, function(result) {
            console.log("删除成功！");
            res.send('更新成功！');
            db.close();
        });
    });
})

app.get('/update', function(req, res) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        updateData(db, {'name': '菜鸟教程'}, {'name': '菜鸟'}, function(result) {
            console.log("更新成功！");
            res.send('更新成功！');
            db.close();
        });
    });
})

app.get('/find', function(req, res) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        findData(db, {'name': '菜鸟教程'}, function(result) {
            console.log("查询成功！");
            res.send('查询结果：' + JSON.stringify(result));
            db.close();
        });
    });
})

var server = app.listen(9990, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
