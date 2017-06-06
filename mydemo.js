/**
 * Created by kuangxing on 2017/6/4 10:16.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
//options
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
phantom.outputEncoding='gbk';
casper.options.waitTimeout = 1000;
var text;
casper.start();
casper.open('http://www.baidu.com',function () {
    this.die('error',1);
});
casper.then(function () {
    text = this.evaluate(function (temp) {
        $("#su").attr('value',temp);
       return $("#su").val() ;
    },'你好');

});
casper.wait(2000,function(){
    console.log(text);
    this.capture('haha.jpg');
    /*,undefined,{
        format: '.png',//指定文件格式，比如.png,.jpg,.gif等。
        quality: 75//用于指定生成的图片质量，可选 1 到 100。
    }*/
    this.echo(this.getTitle());
});


casper.then(function () {
    this.fill('form[action="/s"]',{wd:'CasperJs'},true);
    //this.debugPage();
});
casper.then(function () {
    this.click('#su');
});

casper.wait(1000,function () {
    this.capture('good.png');

    console.log('url--------'+this.getCurrentUrl())
});
var temp;
casper.then(function () {
    temp = this.evaluate(function () {
        var temps=[];
        var links = $("div #u1");
        console.log("000000000000000000"+links.length);
        for (var i=0;i<links.length;i++) {
            href = links[i].getElementsByTagName('a')[0].getAttribute('href');
            temps.push({href:href})
        }
        return temps;
        //return casper.querySelector("#ul a");
    });
});
var c;
casper.then(function () {
    c = this.evaluate(function () {
        var temp =[];
        var alink = document.querySelectorAll("#u1");
        for (var i=0;i<alink.length;i++) {
            var link = alink[i].getElementsByTagName("a")[0].getAttribute("href");
            temp.push({link:link});
        }
        return temp;
    });

});
var url;
casper.then(function () {
    for(var i = 0; i < c.length; i++){
        if (i<4) {
            console.log(JSON.stringify(c[i]));
        }
        //casper.exit();
    }
    console.log(JSON.stringify(c));
    //console.log(c(url,txt));
    //console.log(JSON.stringify(temp));
});


//登陆 url=http://www.zk120.com/accounts/login?next=/
/*casper.open('http://www.zk120.com/accounts/login?next=/');
casper.then(function () {
    this.capture('jj.png');
});



casper.wait(500, function(){
    this.fill('form#login', {username: '13568835491', password: 'cym123'}, false);
});
casper.then(function(){
    this.click("#login-submit");
});
casper.then(function () {
    this.wait(1000,function () {
        this.capture('success.png');
    });

});
casper.run();

casper.then(function(){
    this.click("#login-submit");
});
casper.then(function () {
    this.capture('success.png');
});*/
//得到首页中url: http://www.zk120.com/中 class="index-icons ice_bg space_mt clearfix"的a链接
var url ='http://www.zk120.com/';
var links;
casper.start(url,function () {
   links = this.evaluate(function () {
       var results=[];
       var elts = document.getElementsByClassName("index-icon-wrapper pc-show mobile-show");//ice_bg space_pl space_pr space_mt
       for (var i = 0; i < elts.length; i++) {
           var link = elts[i].getElementsByTagName("a")[0].getAttribute("href");
           var headline = elts[i].innerText;
           results.push({link: link, headline: headline});
       }
       return results;
   });
});
//点击a链接标签 进入新页面  得到新页面上的所有a链接标签href
var childLinks;
casper.then(function () {
    for(var i = 0; i < links.length; i++){
        if (i<4) {//得到前四个标签即(古籍,智慧开放,方剂,医案)
            casper.thenOpen('http://www.zk120.com'+links[i].link,function () {
                childLinks = this.evaluate(function () {
                    var childResults=[];
                    var linkss=[];
                    var elts = document.getElementsByClassName("group_content four_clumn clearfix");
                    for (var j=0;j<elts.length;j++) {
                        var alinks =elts[j].getElementsByTagName("a");
                        for (var k=0;k<alinks.length;k++) {
                                var links = alinks[k].getAttribute('href');
                                var text = alinks[k].innerText;
                                linkss.push({links:url+links,text:text});
                        }
                        childResults.push({linkss:linkss});
                    }
                    return childResults;
                });
            });
        }
    }
});
casper.then(function () {
    //console.log(JSON.stringify(childLinks));
    for (var i=0;i<childLinks.length;i++) {
        var l = childLinks[i].linkss;
        for (var j=0;j<l.length;j++) {
            console.log(l[j].links+"=="+l[j].text);
        }
    }
});
casper.run();
