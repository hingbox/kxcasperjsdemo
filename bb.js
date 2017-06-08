/**
 * Created by kuangxing on 2017/6/5 14:38.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var casper = require('casper').create({
    clientScript:[
        'jquery.js'
    ],
    pageSettings:{
        loadImages:  true,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel:'info',// 为true时，代码执行过程中的日志信息将被输出到本地控制台
    verbose:true,
    onError: function(self,m){
        this.capture("error.png");
        console.log("FATAL:" + m);
        self.exit();
    }
});
var url='http://www.zk120.com';
var utils = require('utils');
phantom.outputEncoding='gbk';

 phantom.outputEncoding="utf-8";
casper.start();
//暂时不登录
/* casper.start('http://www.zk120.com/accounts/login?next=/',function () {
     this.fill('form#login', {username: '13568835491', password: 'cym123'}, false);
 });

 casper.then(function(){
    this.click("#login-submit");
     this.wait(1000,function () {
         console.log('登陆成功');
     })
 });*/

//casper.start(url);
/*var tt;
casper.thenOpen('http://www.zk120.com/an/search?qe=%E6%89%8B%E8%B6%B3%E5%8F%A3%E7%97%85&',function () {
    tt = this.evaluate(function () {
        var cc=[];
        var obj = document.getElementsByClassName("resultItem space_pl space_pr");//resultItem space_pl space_pr
        for (var i=0;i<obj.length;i++) {
            var href = obj[i].getAttribute('href');
            var title = obj[i].innerText;
            cc.push({href:href,title:title});
        }
        return cc;
    });
    this.wait(2000,function () {
        for (var x in tt) {
            console.log("sdfaaaaaaaaaaa"+tt[x].href);
        }
    });
});*/
var links;
function getLinks() {
    var links=  document.querySelectorAll("ul.resultList li a");
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
    });
}
/*
casper.thenOpen('http://www.zk120.com/an/search?qe=%E9%81%97%E5%B0%BF&',function () {
    links = this.evaluate(getLinks);
    this.wait(2000,function () {
        for (var x in links) {
            console.log("sdfaaaaaaaaaaa"+links[x]);
        }
    });
});*/

var a,b,content,t,tt,ttt;
casper.thenOpen(url,function () {
    casper.wait(2000,function(){
        a = casper.evaluate(function() {
            var c=[];
            var obj = document.getElementsByClassName("index-icon-wrapper pc-show mobile-show");
            for (var i=0;i<obj.length;i++) {
                var href = obj[i].getElementsByTagName("a")[0].getAttribute('href');
                var title = obj[i].innerText;
                c.push({href:href,title:title});
            }
            return c;
        });
        console.log("There were "  + a.length + " stories");
        for(var i = 0; i < a.length; i++){
            if (i<4) {
                //console.log(url+a[i].href);//得到首页上的四个超链接(古籍，智慧开放,方剂,医案)
                var linkUrl = url+a[i].href;
                casper.thenOpen(linkUrl,function () {
                    //得到古籍中页面中所有超链接
                      b = casper.evaluate(function () {
                        var d=[];
                        var dd=[];
                        var gujiObj = document.getElementsByClassName("group_content four_clumn clearfix");
                        for (var j=0;j<gujiObj.length;j++) {
                             var href = gujiObj[j].getElementsByTagName("a");//得到所有的a链接
                             for (var m=0;m<href.length;m++) {
                                    var hrefs = href[m].getAttribute('href');
                                    var titles = href[m].innerText;
                                    dd.push({hrefs:('http://www.zk120.com'+hrefs),titles:titles})
                             }
                             d.push({links:dd});
                         }
                         return d;
                    });
                    console.log(JSON.stringify(b));
                    for (var n=0;n<b.length;n++) {
                        var lill = b[n].links;
                        for (var b=0;b<lill.length;b++) {
                            var links;
                            casper.thenOpen(lill[b].hrefs,function () {
                                links = this.evaluate(function () {
                                    var links=  document.querySelectorAll("ul.resultList li a");
                                    return Array.prototype.map.call(links, function (e) {
                                        return e.getAttribute('href');
                                    });
                                });

                            });
                            this.run();
                            //casper.then(function () {
                                this.wait(3000,function () {
                                    for (var x in links){
                                        console.log("link==="+url+links[x]);//得到遗尿中每个超链接
                                        //打开每个超链接信息
                                        casper.thenOpen(url+links[x],function () {
                                                ttt= casper.evaluate(function getProp() {
                                                    var temps;
                                                    var temp = $(".space_pl.space_pr p");
                                                    //console.log(temp.html());
                                                    for (var i=0;i<temp.length;i++){
                                                       temps+=temp.eq(i).innerText;
                                                    }
                                                    return temps;
                                                });


                                        });
                                        this.run();
                                        console.log("kkkkkkkk"+ttt);
                                    }
                                });
                            //});

                        }
                       /* for (var at in lill){
                            console.log(at+"======"+lill[at].hrefs+"====="+lill[at].titles);//这个地方得到每个超链接的标签
                            casper.thenOpen(lill[at].hrefs,function () {
                                links = casper.evaluate(function () {
                                    var links=  document.querySelectorAll("ul.resultList li a");
                                    return Array.prototype.map.call(links, function (e) {
                                        return e.getAttribute('href');
                                    });
                                });
                            });
                            casper.then(function () {
                                this.wait(2000,function () {
                                    for (var x in links){
                                        console.log("link==="+links[x]);
                                    }
                                });
                            });
                        }*/
                    }
                });
            }
        }
    });
});

/*casper.then(function () {
    console.log("SDAFFFFFFFFFFFFFFFFFFFFFFFF"+b.length);
    for (var k=0;k<b.length;k++) {
        var link = b[k].links;
        for (var v in link) {
            console.log("print"+v.hrefs+"=="+v.titles)
        }
    }
});*/
casper.run();