/**
 * Created by lenovo on 2017-07-14.
 */


//左侧menu栏
var menuUl1 = document.getElementById("menuUl1");
var menuLis = menuUl1.getElementsByTagName("li");
//中间的大背景
var bg = document.getElementById("bg");//menu1R1.png
var bigImg = document.getElementById("bigImg");
var bigImgul2 = bigImg.children[0];//ul
var closeLeft = document.getElementById("closeLeft");//点击关闭左边menu栏
var menu = document.getElementById("menu");//点击宽度为0
var leftMenuBt = document.getElementById("leftMenuBt");
var icon = document.getElementsByClassName("icon");//头像
var clickFlag = false;
var bg = document.getElementById("bg");//获取坐标
var imgLis = bigImg.getElementsByTagName("li");//中间的li标签
var personNames = document.getElementsByClassName("name");
var personIcon = document.getElementsByClassName("icon");
//左边的线
var leftLine = document.getElementsByClassName("left");
var rightLine = document.getElementsByClassName("right");
//右边隐藏的
var right_message = document.getElementById("right_message");
//详细资料按钮
var xiangxi = document.getElementById("xiangxi");
//右边的关闭
var right_close = document.getElementById("right_close");
//记录
var dianji1 = 0;
var yidong1 = 0;
//右边隐藏的ul
var right_message_ul = document.getElementById("right_message_ul");
//判断是否可以调用
var menulisFlag = true;

// 记录次数
var djnum = 0;

//左边menu的消失出现
closeLeft.onclick = function () {
    animate(menu, {
        "left": -(menu.offsetWidth),
        "opacity": 0
    });
    animate(leftMenuBt, {
        "left": 80,
        "opacity": 1
    });
}

leftMenuBt.onclick = function () {
    chuangjianTouXiang()
    animate(leftMenuBt, {
        "left": -52,
    });
    animate(menu, {
        "left": 0,
        "opacity": 0.7
    });

}

//生成头像
chuangjianTouXiang();
var rightJianTou = document.getElementById("jiantou");


//右边详细资料箭头 的移动
rightMoveJiantou();

function rightMoveJiantou() {
    animate1(rightJianTou, {
        "left": 85
    }, function () {
        animate1(rightJianTou, {
            "left": 70
        }, function () {
            rightMoveJiantou();
        });
    });
}

// right_message

//li标签的事件
var thisFlag;
for (var x = 0; x < menuLis.length; x++) {
    //动态创建span
    menuLis[x].appendChild(document.createElement("span"));
    menuLis[x].setAttribute("index", x);
    //点击事件
    menuLis[x].setAttribute("dj", 0)
    menuLis[x].onclick = function () {
        if (menulisFlag) {
            menulisFlag = false;
            // hideMenu(this);
            allHide();
            showMenu(this);
            nextBigImg(this);
            thisFlag = this;
            this.setAttribute("dj", 1);

            // console.log(dianji1);
            // 改变右侧的元素的图片
            for (var j = 0; j < right_message_ul.children.length; j++) {
                right_message_ul.children[j].style.opacity = 0;
            }
            var ImgIndex = this.getAttribute("index");
            ImgIndex = ImgIndex > 6 ? (ImgIndex - 1) : ImgIndex;

            // right_message_ul.children[ImgIndex].style.opacity = 1;

            animate(right_message_ul.children[ImgIndex], {
                "opacity": 1,
            }, function () {
                menulisFlag = true;
            });
        }
    }

    //鼠标移动事件
    menuLis[x].onmouseover = function () {
        if (this.getAttribute("index") == 6) {
            return;
        }
        showMenu(this);
    }

    menuLis[x].onmouseout = function () {
        // var djn = this.getAttribute("dj");
        if (thisFlag != this || this.getAttribute("dj") == 0) {
            hideMenu(this);
            // console.log("我要消失");
        }
    }
    //li的背景变透明
    animate(menuLis[x].children[4], {
        "opacity": 0.1
    });
}


//动态创建中的的图片  中间li的元素
for (var y = 0; y < menuLis.length; y++) {

    if (y == 6) {
        continue;
    }

    var imgnameIndex = y;
    var lis = document.createElement("li");
    lis.setAttribute("class", "bigImgLis bigImgLisHide");
    lis.setAttribute("index", y);
    y == 0 ? lis.setAttribute("class", "bigImgLis bigImgLisShow") : "";

    //人物
    var Person = document.createElement("div");
    Person.setAttribute("class", "Personclass");
    lis.appendChild(Person);


    bigImgul2.appendChild(lis);
    //人物名字
    var imgs = document.createElement("div");
    lis.appendChild(imgs);
    imgs.setAttribute("class", "imgsName");
    imgs.style.zIndex = 2;
    //人物信息
    var imgsXinxi = document.createElement("div");
    imgsXinxi.setAttribute("class", "imgsXinxi");
    lis.appendChild(imgsXinxi);//menu1Img.png
    //文字描述 imgsText  txt1.png
    var imgsText = document.createElement("div");
    lis.appendChild(imgsText);

    imgsText.setAttribute("class", "imgsText");
    imgsXinxi.style.background = "url(" + 'img/menu' + (imgnameIndex + 1) + 'Img.png' + ") center ";
    imgs.style.background = "url(" + 'img/menu' + (imgnameIndex + 1) + 'T.png' + ") no-repeat center ";
    imgsText.style.background = "url(" + 'img/txt' + (imgnameIndex + 1) + '.png' + ")";
    Person.style.background = "url(" + 'img/menu' + (imgnameIndex + 1) + 'NR.png' + ") center ";
    lis.style.background = "url(" + 'img/bg' + (imgnameIndex + 1) + '.jpg' + ") center ";
    ;
}


//创建 right_message 中的元素  menu1VR.png
for (var i = 0; i < bigImgul2.children.length; i++) {
    var lis2 = document.createElement("li");
    var lis2Div = document.createElement("div");
    lis2.appendChild(lis2Div);
    var lis2ImgPath = i;
    $(lis2).css({
        "height": "100%",
        "width": "100%",
        "position": "absolute",
        "top": "0",
        "left": "0",
        "opacity": 0,
        "cursor": "pointer",
        "zIndex": 0,
    });
    $(lis2Div).css({
        "height": "100%",
        "width": "100%",
        "background": "url(" + 'img/menu' + (lis2ImgPath + 1) + 'VR.png' + ") center center no-repeat",
        "position": "absolute",
    });
    right_message.getElementsByTagName("ul")[0].appendChild(lis2);
    //----------------------------换人物-------------------------------------
    $(lis2).click(function () {
        for (var i = 0; i < right_message_ul.children.length; i++) {
            if (getStyle(right_message_ul.children[i], "opacity") == "1") {
                // console.log(right_message_ul.children[i]);
                var clone1 = bigImgul2.children[i].children[0];//
                var clone2 = right_message_ul.children[i].children[0];
                right_message_ul.children[i].insertBefore(clone1, clone2);
                bigImgul2.children[i].insertBefore(clone2, bigImgul2.children[i].children[0]);
                // clone1.style.left = "0";
                // clone2.style.left = "-400px";
                animate(clone1, {
                    "left": "0"
                });
                animate(clone2, {
                    "left": "-400"
                })
            }
        }
    });
}

//中间li里面的元素
var Personclass = document.getElementsByClassName("Personclass");//人物
var imgsName = document.getElementsByClassName("imgsName");//名称
var imgsXinxi = document.getElementsByClassName("imgsXinxi");//右下角信息
var imgsText = document.getElementsByClassName("imgsText");//介绍文本
//打开右侧
xiangxi.onclick = function () {
    animate(xiangxi, {//详细信息按钮
        "left": 1366,
    });
    for (var c = 0; c < bigImgul2.children.length; c++) {
        animate(bigImgul2.children[c].children[0], {
            "left": -400
        });
    }
    for (var a = 0; a < Personclass.length; a++) {
        /*  animate(Personclass[a],{
         "left" : -400
         });*/
        animate(imgsName[a], {
            "left": 500
        });
        animate(imgsXinxi[a], {
            "left": 700
        });
        animate(imgsText[a], {
            "left": -400
        });
        //右侧盒子的元素
        if (getStyle(imgLis[a], "opacity") == "1") {
            for (var b = 0; b < right_message_ul.children.length; b++) {
                right_message_ul.children[b].style.opacity = 0;
                right_message_ul.children[b].style.zIndex = 0;
            }
            animate(right_message_ul.children[a], {
                "opacity": 1,
                // "zIndex" : 1
            })
        }
    }
    animate(right_message, {
        "left": 388,
    },function () {
        // right_close.style.position = "fixed";
    });
    right_close.style.display = "block";

}

//关闭右侧
right_close.onclick = function () {
    animate(xiangxi, {
        "left": 1200,
    });
    for (var b = 0; b < bigImgul2.children.length; b++) {
        animate(bigImgul2.children[b].children[0], {
            "left": 0
        });
    }
    for (var a = 0; a < Personclass.length; a++) {
        /*animate(bigImgul2[a],{//bigImgul2
         "left" : 0
         });*/
        animate(imgsName[a], {
            "left": 950
        });
        animate(imgsXinxi[a], {
            "left": 1034
        });
        animate(imgsText[a], {
            "left": 120
        });
    }
    animate(right_message, {
        "left": 1366,
    });
    // right_close.removeAttribute("class");
    // right_close.setAttribute("class","right_close");
}

//right_message 的 上下按钮
var right_message_bt1 = document.createElement("div");
var right_message_bt2 = document.createElement("div");
right_message_bt1.setAttribute("class", "right_message_bt1");
right_message_bt2.setAttribute("class", "right_message_bt2");
right_message.appendChild(right_message_bt1);
right_message.appendChild(right_message_bt2);

//两个按钮的单击事件
right_message_bt1.onclick = function () {
    //获取当前页面显示的图片
    for (var i = 0; i < imgLis.length; i++) {
        // console.log(imgLis[i].style.opacity);
        if (getStyle(imgLis[i], "opacity") == "1") {
            var ImgIndex = i;
            ImgIndex--;
            if (ImgIndex < 0) {
                ImgIndex = 10;
            }
            imgLis[i].style.opacity = "0";
            animate(imgLis[ImgIndex], {
                "opacity": 1
            });
            //同步左边menu栏头像样式
            hideMenu(imgLis[i]);
            showMenu(imgLis[ImgIndex]);
            //同步ul隐藏人物
            for (var j = 0; j < right_message_ul.children.length; j++) {
                right_message_ul.children[j].style.opacity = "0";
                right_message_ul.children[j].style.zIndex = "0";
            }
            // right_message_ul.children[ImgIndex].style.opacity = "1";
            // if ( j == right_message_ul.children.length ) { // 问题 可以
            animate(right_message_ul.children[ImgIndex], {
                "opacity": 1,
                // "zIndex" : 1
            })
            // }
        }
    }
}


right_message_bt2.onclick = function () {
    //获取当前页面显示的图片
    for (var i = 0; i < imgLis.length; i++) {
        // console.log(imgLis[i].style.opacity);
        if (getStyle(imgLis[i], "opacity") == "1") {
            var ImgIndex = i;
            ImgIndex++;
            if (ImgIndex > 10) {
                ImgIndex = 0;
            }
            imgLis[i].style.opacity = "0";
            animate(imgLis[ImgIndex], {
                "opacity": 1
            });
            //同步左边menu栏头像样式
            hideMenu(imgLis[i]);
            showMenu(imgLis[ImgIndex]);
            //同步ul隐藏人物
            for (var j = 0; j < right_message_ul.children.length; j++) {
                right_message_ul.children[j].style.opacity = "0";
                right_message_ul.children[j].style.zIndex = "0";
            }
            if (j == right_message_ul.children.length) {
                animate(right_message_ul.children[ImgIndex], {
                    "opacity": 1,
                    // "zIndex" : 1
                });
            }
        }
    }
}


//------------------------------------------------------
function showMenu(th, fu) {//menu1H.png
    if (th.getAttribute("index") != 6) {
        var menuPathImgIndex = +th.getAttribute("index");
        var menuPathImg = "url(" + 'img/menu' + (menuPathImgIndex + 1) + 'H.png' + ")"
        menuLis[th.getAttribute("index")].children[0].style.background = menuPathImg;
        animate(leftLine[th.getAttribute("index")], {
            "width": 45,
        });
        animate(rightLine[th.getAttribute("index")], {
            "width": 45,
        });
        //name
        animate(personNames[th.getAttribute("index")], {
            "left": 115,
            "opacity": 1
        });
        personNames[th.getAttribute("index")].style.display = "block";
        //icon
        animate(personIcon[th.getAttribute("index")], {
            "margin-left": -25
        })
        if (typeof fu == "function") {
            fu();
        }
    }

}

function hideMenu(th, fu) {
    for (var i = 0; i < icon.length; i++) {
        if (menuUl1.children[i].getAttribute("dj") == 1 && thisFlag != th) {
            continue;
        }
        var imgPath = "url(" + 'img/menu' + (i + 1) + 'S.png' + ") center no-repeat";
        icon[i].style.background = imgPath;
        icon[i].setAttribute("index", i);
        icon[i].setAttribute("class", "wrapCenter icon");
    }

    animate(leftLine[th.getAttribute("index")], {
        "width": 0,
    });
    animate(rightLine[th.getAttribute("index")], {
        "width": 0,
    });
    //name
    animate(personNames[th.getAttribute("index")], {
        "left": 150,
        "opacity": 0
    });
    personNames[th.getAttribute("index")].style.display = "none";
    //icon
    animate(personIcon[th.getAttribute("index")], {
        "margin-left": 0
    });
    if (typeof fu == "function") {
        fu();
    }
}


function allHide() {
    chuangjianTouXiang();
    for (var i = 0; i < menuLis.length; i++) {
        animate(menuLis[i].children[1], {
            "left": 150,
            "opacity": 0
        });
        personNames[i].style.display = "none";
        animate(menuLis[i].children[2], {
            "width": 0,
        });
        animate(menuLis[i].children[3], {
            "width": 0,
        });
        animate(personIcon[i], {
            "margin-left": 0
        });
    }
}


function chuangjianTouXiang() {
    for (var i = 0; i < icon.length; i++) {
        var imgPath = "url(" + 'img/menu' + (i + 1) + 'S.png' + ") center no-repeat";
        icon[i].style.background = imgPath;
        icon[i].setAttribute("index", i);
        icon[i].setAttribute("class", "wrapCenter icon");
    }
}

function nextBigImg(th) {
    if (th.getAttribute("index") == 6) {
        return;
    }
    showMenu(th);
    var bigImgLis = bigImg.getElementsByTagName("li");
    for (var y = 0; y < bigImgLis.length; y++) {
        animate(bigImgLis[y], {
            "opacity": 0
        });
    }
    var Picindex = +th.getAttribute("index");
    Picindex = Picindex >= 7 ? (Picindex - 1) : Picindex;
    animate(bigImgLis[Picindex], {
        "opacity": 1
    });
    showMenu(th);
}


//bg1.jpg]
///----------页面动画

/*var flag1 = true;

lis.onclick = function (e) {
        xz = e.pageX;
        yz = e.pageY;

        flag1 = false;
        var xt, yt;

        /!*var timerId = setTimeout(function () {
         xt = e.pageX;
         yt = e.pageY;
         xt = Personclass[0].offsetLeft;
         yt = Personclass[0].offsetTop;*!/

        xt = lis.offsetWidth * 0.5;
        yt = lis.offsetHeight * 0.5;

        var xtarget = xt > xz ? 13 : -13;
        var ytarget = yt > yz ? 13 : -13;
        console.log(xtarget+"====="+ytarget);
        animate(Personclass[0], {
            "top": ytarget + Personclass[0].offsetTop,
            "left": xtarget + Personclass[0].offsetLeft
        });

   /!* animate(imgsText[0], {
        "top": ytarget + imgsText[0].offsetTop,
        "left": xtarget + imgsText[0].offsetLeft
    });
    animate(imgsName[0], {
        "top": ytarget + imgsName[0].offsetTop,
        "left": xtarget + imgsName[0].offsetLeft
    });
    animate(imgsXinxi[0], {
        "top": ytarget + imgsXinxi[0].offsetTop,
        "left": xtarget + imgsXinxi[0].offsetLeft
    });*!/
}*/


//头部广告
$("#banners").mouseover(function () {
    $("#noneImg").css({
        "display": "block"
    });
    $("#noneImgSmall").css({
        "visibility": "hidden"
    });
}).mouseout(function () {
    $("#noneImg").css({
        "display": "none"
    });
    $("#noneImgSmall").css({
        "visibility": ""
    });
});

// 游戏栏的显示
$("#showTable").mouseover(function () {
    // $("#table").stop().slideDown();
    $("#table").show();
});
$('#topBarTitle').mouseleave(function () {
    $("#table").hide();
})
$("#table").mouseleave(function () {
    $("#table").hide();
});

//上下滑动效果
var slideCount = 0;
setInterval(function () {
    $("#upDownRemo_ul").animate({
        "top" : -56 * slideCount,
    },1000,function () {
        slideCount++;
        if (slideCount >= $("#upDownRemo_ul").children().length ) {
            $("#upDownRemo_ul").css("top",0)
            slideCount = 0;
        }
    });
},3000);
