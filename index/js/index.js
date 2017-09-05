/**
 * Created by REX on 2017/7/14.
 */
//数据

//͸shows(透明)展示数据
var date1 = [
  {"name1":"白云山","m1":"九生","m2":"九世", "content":"结婚7周年快乐!"},
  {"name1":"天外飞仙","m1":"小狼牙","m2":"小毒牙", "content":"结婚4周年快乐！"},
  {"name1":"天府之国","m1":"幽暗罗刹","m2":"夜梦瑟", "content":"结婚8周年快乐！"},
  {"name1":"弱水三千","m1":"穿越的唯美","m2":"情义潇洒", "content":"结婚5周年快乐!"},
  {"name1":"盛世长安","m1":"夜吟","m2":"铅笔裤", "content":"结婚5周年快乐！"},
  {"name1":"月夜之城","m1":"天然呆","m2":"凡尘璐", "content":"结婚8周年快乐！"},
  {"name1":"","m1":"","m2":"亲爱的哥哥姐姐们!请你们投上宝贵的一票! ! !","content":"吴煜, 王林, 贾聪益, 郑居倩, 郑佳, 杨海军, 李巍, 肖眺, 刘璐, 龚楠翔"}
]
//英雄介绍数据
var date2 = [
  {"zw":"全能","ts":"培养能力强,多流派发展"},
  {"zw":"近战 瞬发 狂战","ts":"爆发力强 杀戮狂魔"},
  {"zw":"远程 控制 召唤","ts":"召唤灵兽 全面控场"},
  {"zw":"防御 坦克 团队","ts":"防御力强 团队领导"},
  {"zw":"远程 法师 高攻","ts":"法系输出 腾云飞行"},
  {"zw":"远程 偷袭 速度","ts":"超远射程 释放陷阱"},
  {"zw":"治疗 毒医 辅助","ts":"团队治疗 用毒高手"},
  {"zw":"刺杀 隐遁 暴击","ts":"隐身能力 神秘偷袭"},
  {"zw":"全能 回蓝 御剑","ts":"生存能力强 物法双休"},
  {"zw":"变身 冲刺 强控","ts":"攻防兼备 控制干扰"},
  {"zw":"阵地战 爆发系","ts":"绘物成真 以静制动"},
]
//卷轴部分数据
var date3 = [
  {"t":-600,"l":-800},
  {"t":600,"l":-800},
  {"t":-600,"l":-800},
  {"t":600,"l":-800},
  {"t":-600,"l":-800},
  {"t":600,"l":-800},
//    下半部
  {"t":-600,"l":-800},
  {"t":600,"l":-800},
  {"t":-600,"l":-800},
  {"t":600,"l":-800},
  {"t":-600,"l":-800},
  {"t":600,"l":-800}
];




//topbanner开始

/*************卷轴部分***************************************/
jzyd();
function jzyd() {
  var kngx = id("kngx");
  var jzcc = id("jzcc");
  var juan_z = id("juan_z");
  var imgjz = id("imgjz");
  var bbjzc = id("bbjzc");
  var ttjzc = id("ttjzc");
  var flag = true;
  var flag1 = true;
  var a =10;
  var ttimerId = null;
  var ttimerId1 = null;
  var timer = null;
  var timer1 = null;
  var timer2 = null;
  var ttimerId1;
  creatImg();
  function creatImg(){
    for(var i = 0 ; i < 11; i++){
      var img = document.createElement("img");
      img.index = i;
      img.src = "images/jobs_"+(i+1)+".png";
        img.style.top = date3[i]["t"]+"px";
        img.style.left = date3[i]["l"]+"px";
      jzcc.appendChild(img);
    }
    imgs = jzcc.children;
  };
  var imgs = jzcc.children;
  kngx.onclick = function () {
    juan_z.style.display = "block";
    animate(juan_z,{"top":0,"left":350});

    var deg =0;
    clearInterval(ttimerId);
     ttimerId =  setInterval(function(){
      deg += 6;
      juan_z.style.transform = "rotate("+(deg)+"deg)";
      if(deg >= 450){
        clearInterval(ttimerId);
        animate2(jzcc, {"height": 500});
        var ll = juan_z.offsetLeft;

          var i = 0;
          timer = setInterval(function(){
            if(flag){
              flag = false;
              setTimeout(herj(i),300);
            };
          },10)
      }
    },10);
  };
  function herj(i){
    animate2(imgs[i],{"opacity":1,"left":100,"top":40},function(){
      var flag = true;
      if(i==10){
        imgs[i].style.opacity = 0;
        clearInterval(timer);
        herc();
      }
      else {
          imgs[i].style.opacity = 0;
        timer1 = setInterval(function(){
          if(flag){
            flag = false;
            setTimeout(herj(i+1),300);
          }else{
            clearInterval(timer1);
          }
        },10)
      }
    });
  }
 function herc(){
   var deg1 = 0;
   animate2(jzcc,{"height": 0},function(){
     clearInterval(ttimerId1);
     var ttimerId1 =  setInterval(function(){
       deg1 -= 6;
       juan_z.style.transform = "rotate("+(deg1)+"deg)";
       if(deg1 <= -450){
         clearInterval(ttimerId1);
         animate2(juan_z,{"left":-400,"top":-700},function(){
           jzcc.innerHTML = "";
           juan_z.style.display = "none";
           console.log(jzcc);
           jzyd();
           imgs = jzcc.children;
           console.log(imgs);
         })
       }
     },10);
   })
 }
}

//bigpic
  zhanPic();
function zhanPic(){
  var adpic = id("adpic");
  var bigpic = id("bigpic");
  var lspic = id("lspic");
  var showgame = id("showgame");
  adpic.onmouseover = function(){
    bigpic.style.display="block";
    lspic.style.visibility="hidden";
    showgame.style.display = "none";
  }
  adpic.onmouseout = function(){
    bigpic.style.display="none";
    lspic.style.visibility="visible";
  }
}

//showgame
showGame();
function showGame() {
  var game = id("game");
  var showgame = id("showgame");
  var flag = true;
  var bigpic = id("bigpic");
  var lspic = id("lspic");
  game.onmousemove = function () {
    showgame.style.display = "block";
  }

  game.onmouseleave = function () {
    showgame.style.display = "none";
  }
}
bxLb();
function bxLb(){
  var lund = id("lundiv");
  var divId =  0;

  function autolb(){
    if(divId == 2){
      divId=0;
      lund.style.top = 0;
    }
    divId++;
    var target = -divId*110;
   animate(lund,{"top":target});
  }
  lund.onmouseover = function(){
    clearInterval(timerId);
  }
  lund.onmouseout = function(){
    clearInterval(timerId);
    timerId = setInterval(autolb,3000);
  }
  timerId = setInterval(autolb,3000);
};
//topbanner结束

//hbanner开始

//导航栏
navCrt();
function navCrt(){
  var navv=id("navv");
  var t_navl = id("t_navl");
  var t_navr = id("t_navr");
  var nllis = t_navl.children;
  var nrlis = t_navr.children;
  for(var i = 0 ; i <nllis.length ; i++){
    nllis[i].onmouseover = enterLi;
    nrlis[i].onmouseover = enterLi;
    nrlis[i].onmouseout = outLi;
    nllis[i].onmouseout = outLi;
  }
  function enterLi(){
    //this.parentNode.style.backgroundImage = "url('images/nav_bg.png')";
    this.className = "current";
    this.children[1].className = "current1";
    this.children[0].className = "currenta";
    animate2(this.children[0],{"marginTop":40});
  }
  function outLi(){
    this.className = "";
    this.children[1].className = "";
    this.children[0].className = "";
    animate2(this.children[0],{"marginTop":50});
  }
}
//二维码
ewmSm();
function ewmSm(){
  var ltewm = id("ltewm");
  var smi = id("smi");
  var flag  = true;
  function es(){
    if(flag){
      animate(smi,{"top":116},function(){
        flag  = false;
      });
    }
    else {
      animate(smi,{"top":-3},function(){
        flag  = true;
      });
    }
  }
  es()
  var  timerId = setInterval(function(){
    es();
  },100);
}


//hbanner结束


//tmags开始

//time
getTime();
function getTime(){
  var time = id("time");
  var date = new Date();
  var mouth = date.getMonth()+1;
  var dd = date.getDate();
  var day = date.getDay();
  var xq = ["日","一","二","三","四","五","六"];
  time.innerHTML = "今日:"+mouth+"月"+dd+"日[星期"+xq[day]+"]";
}

//show
showEa();
function showEa(){
  var  showUl = id("showUl");
  for(var i = 0 ; i < date1.length; i++){
    var newLi = document.createElement("li");
    newLi.innerHTML = '<span class="lspann">'+(date1[i]["name1"])+'</span>' +
        '<span class="cspann">'+(date1[i]["m1"])+'</span>@'+'<span class="cspann">'+(date1[i]["m2"])+'</span>'+'<span>'+(date1[i]["content"])+'</span>';
    showUl.appendChild(newLi);
  }

  function zfMove(){
    showUl.timerId = setInterval(function(){
      var target = showUl.children[0].offsetWidth;
      var  step = 9;
      var current = showUl.offsetLeft;
      current -= step;
      showUl.style.left = current +"px";
      if(current <= -target) {
        showUl.appendChild(showUl.children[0]);
        showUl.style.left = 0;
      }
    },100)
  }
  zfMove();

  showUl.onmouseover = function(){
    clearInterval(showUl.timerId);
  }
  showUl.onmouseout= function(){
    zfMove();
  }

}

//轮播图部分

lunbo();
function lunbo(){
  var tlb = id("tlb");
  var ultb = tlb.children[0];
  var spanXd = tlb.children[1];
  var ulblis = ultb.children;
  var spans = spanXd.children;
  var picId =0;
  var timerId = null;
  var flag = true;
  for(var i = 0 ; i < ulblis.length; i++){
    var span = document.createElement("span");
    span.index = i;
    span.deg = 0;
    if(i == 0 ){
      span.className = "lunbo_current";
    }
    span.onmouseover = spanLb;
    spanXd.appendChild(span);
  }
  function spanLb(){
    for(var i = 0 ; i < spans.length; i++){
      spans[i].className = "";
      if(spans[i].deg ==0){
        clearInterval(spans[i].timerId)
      }
      animate(ulblis[i],{"opacity":0})
    }
    this.className = "lunbo_current";
    animate(ulblis[this.index],{"opacity":1})
    picId = this.index;
      xz(this);
    }
  timerId = setInterval(autolb,2000);
  function autolb(){
    clearInterval(timerId);
    timerId = setInterval(autolb,2000);
    if(picId == spans.length-1 ){
      picId = -1;
    }
    picId++;
    for(var i = 0 ; i < spans.length ; i++){
      spans[i].className = "";
      animate(ulblis[i],{"opacity":0})
      animate(ulblis[picId],{"opacity":0})
      if(spans[i].deg ==0){
        clearInterval(spans[i].timerId)
      }
    }
    animate(ulblis[picId],{"opacity":1})
      spans[picId].className = "lunbo_current";
    xz(spans[picId]);
  }
  function xz(obj){
    if(obj.deg == 0){
      clearInterval(obj.timerId);
      obj.timerId = setInterval(function(){
        obj.deg += 30;
        obj.style.transform = "rotate("+obj.deg+"deg)";
        //console.log(obj.style.transform);
        if(obj.deg==720){
          clearInterval(obj.timerId);
          obj.deg = 0;
        }
      },10)
    }
  }
  tlb.onmouseover = function(){
    clearInterval(timerId);
  }
  tlb.onmouseout = function(){
    timerId = setInterval(autolb,2000);
  }
}

//TAB栏操作
  makeTab();
function makeTab(){
    var t_tab = id("t_tab");
    var tab_bot = id("tab_bot");
    var hx = id("hx");
    var ttlis = t_tab.getElementsByTagName("li");
    var tabuls = tab_bot.getElementsByTagName("ul");
    var tabId = 0;
    var tab_timerId =null;
    //循环排他
    for(var i = 0 ; i < ttlis.length ; i++){
      ttlis[i].index = i;
      ttlis[i].onmouseover = tabTurn;
      ttlis[i].onmouseout = tabjx;
    }
    function tabTurn(){
      clearInterval(tab_timerId);
      for(var i = 0 ; i < ttlis.length; i++){
        ttlis[i].removeAttribute("class");
        tabuls[i].removeAttribute("class");
      }
      this.setAttribute("class","current");
      var xb = this.index;
      tabId = xb;
      var target = xb*70;
      tabuls[xb].setAttribute("class","show");
      //animate(hx,{"left":target});
      hx.style.left = target + "px";
    }
    tab_timerId=setInterval(autoTab,3000);
    function tabjx(){
      clearInterval(tab_timerId);
      tab_timerId=setInterval(autoTab,3000);
    }
    function autoTab(){
        tabId++;
        if(tabId==4){
          tabId = 0;
          hx.style.left = 0;
        }

        for(var i = 0 ; i < ttlis.length; i++){
          ttlis[i].removeAttribute("class");
          tabuls[i].removeAttribute("class");
        }
      var target = tabId*70;
      //animate(hx,{"left":target});
      hx.style.left = target + "px";
        ttlis[tabId].setAttribute("class","current");

        tabuls[tabId].setAttribute("class","show");

    }
  }
//tmags结束

//老有推荐
srollUp();
function srollUp(){
  var zzz = id("zzz");
  var zzz1 = id("zzz1");
  var old_pic = id("old_pic");
  var old_pic1 = id("old_pic1");
  old_pic.onmouseover = function(){
   animate(zzz,{"bottom":0}) ;
  }
  old_pic.onmouseout = function(){
    animate(zzz,{"bottom":-122}) ;
  }
  old_pic1.onmouseover = function(){
    animate(zzz1,{"bottom":0}) ;
  }
  old_pic1.onmouseout = function(){
    animate(zzz1,{"bottom":-122}) ;
  }
}

//英雄名字
hreoName();
function hreoName(){
  var hename = id("hename");
  var hepic = id("hepic");
  var hejs = id("hejs");
  var slis = id("hejs").children;
  var nlis = hename.children;
  var plis = hepic.children;
  var picId = 0;
  function creatNpic(){
    for(var i = 0 ; i < 11; i++){
      var newLi = document.createElement("li");
      newLi.index = i;
      newLi.innerHTML = '<img src="images/jobs'+(i+1)+'.png">';
      hename.appendChild(newLi);
      if(i==0){
        newLi.className = "current";
      }
      newLi.onmouseover = turnHero;
    }
     nlis = hename.children;
    for(var j = 0 ; j <11 ; j++){
      if(j%2==0){
        nlis[j].children[0].style.top = 10+"px";
      }
      else {
        nlis[j].children[0].style.bottom = 10+"px";
      }
    }
  }
  function creatPpic(){
    for(var i = 0 ; i < 11 ; i++){
      var newLi = document.createElement("li");
      newLi.innerHTML = '<img src="images/jobs_'+(i+1)+'.png">';
      hepic.appendChild(newLi);
      if(i==0){
        newLi.className = "current";
        newLi.id = "hcurrent";
      }
    }
     plis = hepic.children;
  }
  function creatHjs(){
    for(var i = 0 ; i <11 ; i++){
     var newLi = document.createElement("li");
      newLi.innerHTML = '<div class="dw"><span>定位: </span>'+(date2[i]["zw"])+'</div><div class="ts"><span>特色: </span>'+(date2[i]["ts"])+'</div><div class="sixs"><img src="images/jobs_'+(i+1)+'_f.png"></div>';
      hejs.appendChild(newLi);
      if(i==0){
        newLi.className = "current";
        newLi.id = "hcurrent";
      }
    }
    var tslis = hejs.children;
  }

  function turnHero(){
      nlis[picId].className = "";
      this.className = "current";
      var  xb = this.index;
      animate1(plis[picId],{
        "right":-380,
        "opacity":0
      });
      animate(plis[xb],{
        "right":0,
        "opacity":1
      });
      animate1(slis[picId],{
        "left":-200,
        "opacity":0
      });
    animate(slis[xb],{
      "left":0,
      "opacity":1
    });
    picId = xb;
  }
  creatNpic();
  creatPpic();
  creatHjs();
}

function animate1(obj,json,fn) {
  clearInterval(obj.timerId);
  obj.timerId = setInterval(function () {
    var flag = true;
    for (var key in json) {
      if (key == "opacity") {
        var current = getStyle(obj, key) * 100;
        var step = (json[key] * 100 - current) / 3;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        obj.style[key] = current / 100;
        if (current / 100 != json[key]) {
          flag = false;
        }
      } else if (key == "zIndex") {
        var current = parseInt(getStyle(obj, key));
        obj.style[key] = json[key];
        if (current != json[key]) {
          flag = false;
        }
      } else {
        var current = parseInt(getStyle(obj, key));
        var step = (json[key] - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        obj.style[key] = current + "px";
        if (current != json[key]) {
          flag = false;
        }
      }
    }
    if (flag == true) {
      clearInterval(obj.timerId);
      if (typeof fn == "function") {
        fn();
      }
    }
  }, 90);
}

function animate2(obj, json, fn) {
  clearInterval(obj.timerId);
  obj.timerId = setInterval(function () {
    var flag = true;
    for (var key in json) {
      if (key == "opacity") {
        var current = getStyle(obj, key) * 100;
        var step = (json[key] * 100 - current) / 3;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        obj.style[key] = current / 100;
        if (current / 100 != json[key]) {
          flag = false;
        }
      } else if (key == "zIndex") {
        var current = parseInt(getStyle(obj, key));
        obj.style[key] = json[key];
        if (current != json[key]) {
          flag = false;
        }
      } else {
        var current = parseInt(getStyle(obj, key));
        var step = (json[key] - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        obj.style[key] = current + "px";
        if (current != json[key]) {
          flag = false;
        }
      }
    }
    if (flag == true) {
      clearInterval(obj.timerId);
      if (typeof fn == "function") {
        fn();
      }
    }
  },20);
}

/*************上半部结束***************************************/

/*************中部开始***************************************/

var imgWarpDom = document.querySelectorAll('.itcast_news .itcast_news_items .img_warp');
for (var i = 0; i < imgWarpDom.length; i++) {
    imgWarpDom[i].onmouseenter = function () {
        animate(this.querySelector('img'), {
            "width": 206,
            "top": -15,
            "left": -15,
        })
    }
    imgWarpDom[i].onmouseleave = function () {
        animate(this.querySelector('img'), {
            "width": 176,
            "top": 0,
            "left": 0,
        })
    }

}


//ÓÒÏÂ½ÇÊó±êhover¶¯»­
var liHoverDom = document.querySelectorAll('.itcast_code li');
for (var i = 0; i < liHoverDom.length; i++) {
    liHoverDom[i].onmouseenter = function () {
        if (this.querySelector('.codeHover')) {
            animate(this.querySelector('img'), {
                "opacity": 0
            })
            animate(this.querySelector('.codeHover'), {
                "top": 0
            })
        }

        if (this.querySelector('.ahover')) {
            animate(this.querySelector('.ahover'), {
                "z-index": 9
            })
        }
    }
    liHoverDom[i].onmouseleave = function () {
        if (this.querySelector('.codeHover')) {
            animate(this.querySelector('img'), {
                "opacity": 1
            })
            animate(this.querySelector('.codeHover'), {
                "top": 129
            })
        }

        if (this.querySelector('.ahover')) {
            animate(this.querySelector('.ahover'), {
                "z-index": -1
            })
        }


    }
}




/*************中部结束***************************************/

/*************底部开始***************************************/
var musicB = document.getElementsByClassName("musicB");
//console.log(voice);
var audio = document.getElementById("audio");
var spansIndex = -1;

for (var i = 0; i < musicB.length; i++) {

  var ems = musicB[i].getElementsByTagName("em");
  var is = musicB[i].getElementsByTagName("i");
  var spans = musicB[i].getElementsByTagName("span");
  var audio = musicB[i].getElementsByTagName("audio");
}
//console.log(audio);


for (var i = 0; i < spans.length; i++) {
  spans[i].setAttribute("index", i);
  spans[i].onclick = nextMus;
  /* spans[i].ondblclick = function () {

   audio[this.getAttribute("index")].pause();
   }*/
}

var zj = document.getElementById("zj");
var imgT = zj.children[0];
var imgB = zj.children[1];
var audios = document.getElementsByClassName("audios");

//console.log(audios);
var index = 0;
var pf = 0;
//var zj = document.getElementById("zj");
//var imgT = zj.children[0];
//var imgB = zj.children[1];
//var audio1 = zj.children[2];
var musflag = true;
for (var index1 = 0; index1 < audios.length; index1++) {
  audios[index1].setAttribute("di", false);
}

zj.onclick = function () {
  //index = b1;
  //musflag ? audios[0].play() : "";
  var b1;
  for (var b = 0; b < spans.length; b++) {
    if (spans[b].getAttribute("class") == "orange") {
      b1 = b;
      break;
    }
  }

  if (spansIndex != -1) {
    audio[spansIndex].pause();
    audios[b1].pause();
    musflag = false;

    audios[index].setAttribute("di", true);
  }
  if (musflag) {

    audios[0].play();
    musflag = false;
    imgT.style.display = "none";
    imgB.style.display = "block";
    audios[0].setAttribute("di", true);
  } else {
    pf++;//1 2
    if (pf % 2 != 0) {
      for (var a = 0; a < audios.length; a++) {
        //audios[a].setAttribute("di",false);
        if (audios[a].getAttribute("di") != "false") {
          audios[a].pause();

          imgT.style.display = "block";
          imgB.style.display = "none";
          console.log(a);
          break;
        }
      }
    } else {
      audios[b1].play();
      imgT.style.display = "none";
      imgB.style.display = "block";
    }
  }
}

var zb = document.getElementById("zb");
var yb = document.getElementById("yb");


zb.onclick = function () {
  var b1;
  for (var b = 0; b < spans.length; b++) {
    if (spans[b].getAttribute("class") == "orange") {
      b1 = b;
      break;
    }
  }
  index = b1;
  index--;//pf++;
  imgT.style.display = "none";
  imgB.style.display = "block";

  for (var i = 0; i < audios.length; i++) {
    //console.log(audios[i]);
    audios[i].pause();
    audio[i].pause();
    audios[i].load();
    audios[i].setAttribute("di", false);
  }
  if (index < 0) {
    index = 4;
  }
  audios[index].play();
  musflag = false;
  audios[index].setAttribute("di", true);

  bianse();
}

yb.onclick = function () {
  var b1;
  for (var b = 0; b < spans.length; b++) {
    if (spans[b].getAttribute("class") == "orange") {
      b1 = b;
      break;
    }
  }
  index = b1;
  //index = b1;
  index++;//pf++;
  imgT.style.display = "none";
  imgB.style.display = "block";
  for (var i = 0; i < audios.length; i++) {
    audios[i].pause();
    audio[i].pause();
    audios[i].setAttribute("di", false);
    audios[i].load();
  }
  if (index > 4) {
    index = 0;
  }
  audios[index].play();
  musflag = false;
  audios[index].setAttribute("di", true);

  bianse()
}


function bianse() {
  for (var j = 0; j < spans.length; j++) {
    spans[j].removeAttribute("class");
    ems[j].removeAttribute("class");
    is[j].style.opacity = 1;
  }
  is[index].style.opacity = 0;
  ems[index].style.opacity = 1;
  spans[index].setAttribute("class", "orange");
  ems[index].setAttribute("class", "emPic");
}


function nextMus() {
  spansIndex = this.getAttribute("index");
  for (var j = 0; j < spans.length; j++) {
    spans[j].removeAttribute("class");
    ems[j].removeAttribute("class");
    is[j].style.opacity = 1;
    audio[j].pause();
    audio[j].load();
    audios[j].pause();
  }
  is[this.getAttribute("index")].style.opacity = 0;
  ems[this.getAttribute("index")].style.opacity = 1;
  this.setAttribute("class", "orange");
  ems[this.getAttribute("index")].setAttribute("class", "emPic");

  audio[this.getAttribute("index")].play();
  console.log(spansIndex);
  audios[spansIndex].setAttribute("di", true);
}

turnFix();
function turnFix() {
  var fd = id("fix_date");
  var btnPic = id("btnPic");
  window.onscroll = function () {
    var scrollTop = getScroll().scrollTop;
    if (scrollTop >  1000) {
      fd.className = "date fid";
      btnPic.className = "btnPic";
    }
    else {
      fd.className = "date";
      btnPic.className = "";
    }
  }


  function getScroll() {
    return {
      scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };

  }
}


/*************底部结束***************************************/


