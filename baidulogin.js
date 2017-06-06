/**
 * Created by kuangxing on 2017/6/4 7:00.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var casper = require('casper').create();
casper.start('https://www.baidu.com/s?ie=UTF-8&wd=%E7%99%BE%E5%BA%A6',function () {
    this.fill('form#TANGRAM__PSP_8__form',{'userName':'15000128153','password':'xingkuang'},false);
});
casper.then(function () {
    this.click('input[class="pass-button pass-button-submit"]');
    this.echo('开始登陆');
    this.wait(1000,function () {
        this.echo('登陆成功');
        this.capture('login.png')
        this.exit();
    });
});