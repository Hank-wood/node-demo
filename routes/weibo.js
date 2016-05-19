var query = require('../config/connectMysql.js');
var moment = require('moment');
var async = require('async');
var fs = require('fs');
var nullReg = /^\s*$/;

exports.index = function(req, res, next) {
    var data = {
            title: '首页'
        };
    res.render('index', data);
};

//文章详情
exports.detail = function(req, res, next) {
    var data = {
        title: '文章详情'
    };

    res.render('index', data);
}
//发微博
exports.add = function(req, res, next) {
    var insertSql = 'insert into weibo(content,author,adress,img) values("' + req.body.content + '",' + req.session.user.id + ',"'+req.body.adress+'","'+req.body.img_path+'")';

    if (nullReg.test(req.body.content)) {
        res.send({
            code: 0,
            msg: '微博内容不能为空'
        })
    } else {
        query(insertSql, function(err, result, fields) {
            if (err) {
                res.send({
                    code: 0,
                    data: err
                })
            } else {
                res.send({
                    code: 1,
                    msg: 'success'
                })
            }
        })
    }
}
//删微博
exports.delete = function(req, res, next) {
    var deleteSql = 'delete from weibo where id='+ req.body.id;
    if(req.body.id !== undefined){
        query('select * from weibo where id='+req.body.id, function(err, result){
            if(err){
                throw err;
            }
            if(result){
                query(deleteSql, function(err, rows, fields){
                    if(err){
                        throw err;
                    }else{
                        // 删除微博图片
                        if(result[0].img){
                            result[0].img = result[0].img.split(',');
                            async.each(result[0].img, function(img,callback){
                                fs.unlink(img, function(err){
                                    if(err) throw err;
                                    callback(err);
                                })
                            }, function(err){
                                if(err){
                                    throw err;
                                }     
                                res.send({
                                    code: 1,
                                    msg: 'success'
                                })                           
                            })
                        }else{
                            res.send({
                                code: 1,
                                msg: 'success'
                            })
                        }
                        
                    }
                })
                    
            }
            
        })
        
    }
}
//add img
exports.addImg = function(req, res, next) {
    var files = req.files.file;
    async.map(files, function(file, callback){
        // 原路径
        var tmp_path = req.files.file[0].path;
        // 新路径
        var target_path = tmp_path + req.files.file[0].originalname.replace(/.+(\.\w+)$/,'$1');
        fs.rename(tmp_path, target_path, function(err){
            callback(err, target_path);
        })
    }, function(err, result){
        if(err) throw err;
        res.send({
            code : 1,
            msg: {
                img: result
            }
        })
    })   
    
}


