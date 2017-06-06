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
    verbose:true
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
var tt;
casper.thenOpen('http://www.zk120.com/an/search?qe=%E6%89%8B%E8%B6%B3%E5%8F%A3%E7%97%85&',function () {
    tt = this.evaluate(function () {
        var cc=[];
        var temp =document.getElementsByClassName("space_pt space_pb space_pr");
        for (var t in temp) {
            var href = temp[t].getAttribute('href');
            cc.push({href:href});
        }
        return cc;
    });
    console.log("safdddddddddddddddddddddddddd"+tt);
});

casper.then(function () {
    casper.wait(2000,function () {
        console.log("====tt===="+tt);
    });
});
var a,b,content;
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
                        for (var at in lill){
                            console.log(at+"==="+lill[at].hrefs+"=="+lill[at].titles);//这个地方得到每个超链接的标签
                            casper.thenOpen(lill[at].hrefs,function () {
                          /*   content =this.evaluate(function () {
                                //获取遗尿详情href
                                var childLinkArr=[];
                                var childLinkArrs=[];
                                var childLinks= document.getElementsByClassName("resultItem space_pl space_pr");
                                for (var i=0;i<childLinks.length;i++) {
                                    var childHref = childLinks[i].getElementsByTagName("a");
                                    for (var k =0;k<childHref.length;k++) {
                                        //得到遗尿详情的href以及title
                                        var childHref = childHref[k].getAttribute('href');
                                        var childTitle = childHref[k].innerText;
                                        childLinkArrs.push({childHref:childHref,childTitle:childTitle})
                                    }
                                    childLinkArr.push({childHrefs:childLinkArrs});
                                }
                                return childLinkArr;
                            });*/
                                content = this.evaluate(function () {
                                    var cc=[];
                                    var temp = document.getElementsByClassName("space_pt space_pb space_pr");
                                    for (var t in temp) {
                                        var href = temp[t].getAttribute('href');
                                        var text = temp[t].innerText;
                                        cc.push({href:href,text:text});
                                    }

                                    return cc;
                                });
                                casper.then(function () {
                                    this.wait(3000,function () {
                                        console.log(JSON.stringify(content));
                                    });
                                });


                          /*  console.log(content.length);
                            for (var m=0;m<content.length;m++) {
                                var temp = content[m].childHrefs;
                                for (var k in temp) {
                                    console.log(k+"=="+temp[k].childHref+"=="+temp[k].childTitle);
                                }
                            }*/
                            });
                        }
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