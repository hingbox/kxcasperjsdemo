/**
 * Created by kuangxing on 2017/6/12 17:14.
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
casper.start();
var url ='http://www.zk120.com/an/6212.html';
var t = function (){
    var url = casper.evaluate(function () {
        var t="";
        var temp = document.querySelectorAll('.detailItem');
        for (var x in temp) {
            t += temp[x].getElementsByTagName('p').innerText+',';
        }
        return t
    });
    console.log(url);
};
/*function t(){
    var url = casper.evaluate(function () {
        return document.location.href;
    });
    console.log(url);
}*/
casper.thenOpen(url,t);


casper.run();
