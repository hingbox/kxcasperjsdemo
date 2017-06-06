/**
 * Created by kuangxing on 2017/6/3 10:08.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var casper = require('casper').create(),title,links;
phantom.outputEncoding='gbk';
casper.start('http://www.zk120.com/',function () {
     links = casper.evaluate(function () {
        var results = [];
        var href = document.getElementsByClassName("index-icon-wrapper pc-show mobile-show");
        for(var i = 0; i < href.length; i++){
            var link = href[i].getElementsByTagName("a")[0].getAttribute("href");
            results.push({link: 'http://www.zk120.com'+link});
        }
        return results;
    });
});
casper.then(function () {
    console.log("There were "  + links.length + " stories");
    for(var i = 0; i < links.length; i++){
        if (i<4) {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%55"+JSON.stringify(links[i]));
        }
        //casper.exit();
    }
});
var a;
casper.then(function () {
    a = casper.evaluate(function () {
        return this.echo(document.getElementsByClassName("msg_active")[0].innerText);
    });
    //this.click('li[class="index-icon-wrapper pc-show mobile-show"]');
    console.log(a);
});
casper.run();