//main���ֲ�ͼ��ʼ
//1.��ȡԪ��
var lbBox = document.getElementById("lbBox");
var lbWinth = lbBox.offsetWidth;
var ul = lbBox.children[0];
var uls = ul.children;
var ol = lbBox.children[1];
var ols = ol.children;

//2.ols�����¼�
for (var i = 0; i < ols.length; i++) {
    ols[i].setAttribute("index", i);
    ols[i].onmouseover = function () {
        for (var j = 0; j < ols.length; j++) {
            ols[j].removeAttribute("class");
        }
        this.setAttribute("class", "olred");

        var target = -lbWinth * this.getAttribute("index");
        animate(ul, { "left": target });
        picIndex1 = this.getAttribute("index");
    }

}
//3.��ʱ���¼�
var newLi = uls[0].cloneNode(true);
ul.appendChild(newLi);
var picIndex1 = 0;
var mainTime = setInterval(function () {
    if (picIndex1 > ols.length - 1) {
        picIndex1 = 0;
        ul.style.left = -0 + "px";
    }
    picIndex1++;
    var target = -picIndex1 * lbWinth;
    animate(ul, { "left": target });

    for (var i = 0; i < ols.length; i++) {
        ols[i].removeAttribute("class");
    }
    var ind = picIndex1;
    ind = ind > ols.length - 1 ? 0 : ind;
    ols[ind].setAttribute("class", "olred");
}, 3000);

//4.lbBox�������¼�
lbBox.onmouseover = function () {
    clearInterval(mainTime)
}
lbBox.onmouseout = function () {
    mainTime = setInterval(function () {
        if (picIndex1 > ols.length - 1) {
            picIndex1 = 0;
            ul.style.left = -0 + "px";
        }
        picIndex1++;
        var target = -picIndex1 * lbWinth;
        animate(ul, { "left": target });

        for (var i = 0; i < ols.length; i++) {
            ols[i].removeAttribute("class");
        }
        var ind = picIndex1;
        ind = ind > ols.length - 1 ? 0 : ind;
        ols[ind].setAttribute("class", "olred");
    }, 3000);
}
//main���ֲ�ͼ����

//����������

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
    animate(topTxt, { "top": target });
}, 3000);