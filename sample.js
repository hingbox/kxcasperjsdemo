/**
 * Created by kuangxing on 2017/6/2 20:52.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
/*
var casper = require('casper').create();
casper.start('http://casperjs.org/',function(){
    this.echo(this.getTitle());
});
casper.thenOpen('http://phantomjs.org',function () {
    this.echo(this.getTitle());
});
casper.run();*/

/*
var casper = require("casper").create({
    waitTimeout: 10000,
    stepTimeout: 10000,
    verbose: true,
    pageSettings: {
        webSecurityEnabled: false
    },
    onWaitTimeout: function() {
        this.echo('** Wait-TimeOut **');
    },
    onStepTimeout: function() {
        this.echo('** Step-TimeOut **');
    }
});

casper.start();
casper.open("http://techmeme.com");
casper.then(function() {
    this.test.assertExists("#topcol1");
});
//start your script
casper.run();
*/


var casper = require('casper').create();
phantom.outputEncoding="gbk";
casper.start('http://www.baidu.com/', function() {
    this.echo(this.getTitle());
});

casper.then(function() {
    this.capture('baidu-homepage.png');
});

casper.then(function(){
    //this.fill('form[action="/s"]',{wd:'nihao'},true);//填入form进行搜索
    this.fill('form[action="/s"]', { wd: 'thoughtworks' }, true);//填入form，进行搜索
});
casper.then(function(){
    this.capture('nihao-search-result.png')
});
casper.then(function() {
    search_result_titles = this.evaluate(getTitles)
    this.echo(search_result_titles.join('\n'))
});

function getTitles() {
    var titles = $.map($("h3.t a"), function(link) {
        return $(link).text()
    });
    return titles
}
casper.then(function() {
    this.page.onConsoleMessage = function (e) {
        console.log(e);
    }
});
casper.run();

/*
phantom.outputEncoding="GBK";  //这里主要是防止乱码的出现
var casper = require('casper').create({
    clientScripts:[
        'jquery.js'    //这里可以随意设置你的自定义js文件
    ],
    pageSettings:{
        loadImages:false,  //不加载图片
        loadPlugins:false  //不加载插件
    },
    logLevel: "info",
    verbose: true
});
casper.start('http://www.baidu.com',function(){
    //var a=document.getElementById('su');
});
casper.thenEvaluate(function(term) {
    //document.querySelector('input[id="su"]').setAttribute('value', term);

    //var a = document.getElementById("su");
    //a.value=term;
    $("#su").attr("value",term);
}, 'CasperJS');
casper.wait(2000,function(){
    this.capture('hehe.png');
    casper.echo(this.getTitle());
});

casper.run();*/
