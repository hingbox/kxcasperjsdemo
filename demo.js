/**
 * Created by kuangxing on 2017/6/2 22:34.
 * Email:kuangx@elab-plus.com
 * Version:v1.0
 */
var brower = require('casper').create();
var productPrice;
//1.打开浏览器
//2.输入网址并打开（搜索过程也已经简化）
//3.用眼搜索页面
//4.查看价格
brower.start();//打开浏览器
//2.打开页面
brower.thenOpen('http://www.amazon.cn/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6%E4%B8%9B%E4%B9%A6-%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E5%8F%AF%E5%A4%8D%E7%94%A8%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%BD%AF%E4%BB%B6%E7%9A%84%E5%9F%BA%E7%A1%80-Erich-Gamma/dp/B001130JN8/ref=sr_1_1?s=books&ie=UTF8&qid=1394283734&sr=1-1&keywords=%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F');
//3.开始搜索价格
brower.then(function getPrice(){
    productPrice = brower.evaluate(function getPriceFormPage(){
        return price =document.getElementsByClassName('a-size-base a-color-price a-color-price')[0].innerText.replace('￥', '').trim();
    });
});
// 4. 查看价格
brower.then(function outputProductPrice() {
    console.log(productPrice);
    brower.exit();
});
// 将前面定义的步骤 跑起来
brower.run();
