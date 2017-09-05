/**
 * Created by Administrator on 2017/7/15.
 */
var elevenUl = document.getElementById("elevenUl");
var elevenLis = elevenUl.children;
var bottom = document.getElementById("bottom");
var arrPic = ["img/mp1_8dcfced.jpg","img/mp2_1c37658.jpg","img/mp3_ee8aad4.jpg","img/mp4_b283437.jpg","img/mp5_9d3bf53.jpg","img/mp6_38dac7a.jpg","img/mp7_2c6a9f7.jpg","img/mp8_e0a17d9.jpg","img/mp9_a2180e7.jpg","img/mp10_0b3d71d.jpg","img/mp11_795bd91.jpg"];
for(i = 0 ; i < elevenLis.length ; i++){
    elevenLis[i].setAttribute("index",i);
    elevenLis[i].onmouseover = function () {
        this.style.border = "1px solid black";
        bottom.style.backgroundImage = 'url('+arrPic[this.getAttribute("index")]+')';
    }
    elevenLis[i].onmouseout = function () {
        this.style.border = null;
    }
}
index1 = 0;
setInterval(function () {
    do{
        index1++;
        if(index1 == 11){
            index1 -= 11 ;
        }
    }while(index1 > 10 );
    bottom.style.backgroundImage = 'url('+arrPic[index1]+')';
},3000)
