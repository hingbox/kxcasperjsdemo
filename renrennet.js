/**
 * Created by kuangxing on 2017/6/3 17:03.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    verbose: false,
    logLevel: 'debug'
});

casper.start('http://www.renren.com/SysHome.do');

casper.wait(500, function(){
    this.capture("start.png");
});

casper.wait(500, function(){
    this.fill('form#loginForm', {email: 'javaspring_kuang@163.com', password: 'kuang189520xings'}, false);
});

casper.then(function(){
    this.click("#login");
});

casper.wait(500, function(){
    this.capture("after.png");
    this.exit();
});

casper.run();