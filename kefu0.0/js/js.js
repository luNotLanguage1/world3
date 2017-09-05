/**
 * Created by yu on 2017/7/15.
 */
/**
 * Created by 彭林 on 2017/7/14.
 */
//获取元素的样式的值-兼容函数
function getStyle(obj, attr) {
    //能力检测-检测执行当前这个代码的浏览器支持不支持这个东西
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

//获取页面的scrollTop和页面的scrollLeft
function getScroll() {
    return {
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}


//2.封装一个函数，用来获取页面的clientWidth和页面的clientHeight
function getClient() {
    return {
        clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

//2.封装一个函数做兼容，获取pageX和pageY的值
function getPage(e) {
    e = e || window.event;
    return {
        //如果你的浏览器支持e.pageX，直接获取就好了。
        //如果你的浏览器不支持e.pageX，那就计算出这个值（当前可视区的距离加上滚出去的距离。）
        pageX: e.pageX || e.clientX + document.documentElement.scrollLeft,
        pageY: e.pageY || e.clientY + document.documentElement.scrollTop
    };
}


//游戏目录特效
var topBarTitle = document.getElementById("topBarTitle");
var table = document.getElementById("table");
//console.log(table);
topBarTitle.onmouseover = function () {
    table.style.display = "block";
}
table.onmouseover = function () {
    table.style.display = "block";
}
table.onmouseout = function () {
    table.style.display = "none";
}
topBarTitle.onmouseout = function () {
    table.style.display = "none";
}


//领取网易严选宝箱----------小轮播开始
    var topTxt = document.getElementById("topTxt");
        var ps = topTxt.children;
        var pWidth = 55;
        var newP = ps[0].cloneNode(true);
        topTxt.appendChild(newP);
        var pIndex = 0;
        var pTime = setInterval(function () {
            if (pIndex > ps.length - 2) {
                pIndex = 0;
                topTxt.style.top = "0px";
            }
            pIndex++;
            var target = -pIndex * pWidth;
            // console.log(target);
            animate2(topTxt, target);
        }, 3000);


//大录播







