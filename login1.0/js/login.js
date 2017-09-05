var logo = document.getElementById("logo");
var zcLB = document.getElementById("zcLB");
var zcLis = zcLB.children;
var zbP = zcLB.parentNode;
var zcOl = zbP.children[1];
var zcOis = zcOl.children;
var zImgWidth = zbP.offsetWidth;

//ע�Ჿ���ֲ�
zcLunBo();
var newLi = zcLis[0].cloneNode(true);
zcLB.appendChild(newLi);
function zcLunBo() {
    for (var i = 0; i < zcOis.length; i++) {
        zcOis[i].setAttribute("index", i)
        zcOis[i].onmouseover = function () {
            for (var j = 0; j < zcOis.length; j++) {
                zcOis[j].removeAttribute("class");
            }
            this.setAttribute("class", "olred");

            var target = -zImgWidth * this.getAttribute("index");
            animate(zcLB, { "left": target });
            picIndex = this.getAttribute("index");
        }
    }
}
var picIndex = 0;
var zcTime = setInterval(function () {

    if (picIndex > zcOis.length - 1) {
        picIndex = 0;
        zcLB.style.left = -0 + "px";
    }
    picIndex++;

    var target = -zImgWidth * picIndex;

    animate(zcLB, { "left": target });
    for (var i = 0; i < zcOis.length; i++) {
        zcOis[i].removeAttribute("class");
    }
    var ind = picIndex;
    ind = ind > zcOis.length - 1 ? 0 : ind;
    zcOis[ind].setAttribute("class", "olred");

}, 3000);

zbP.onmouseover = function () {
    clearInterval(zcTime);
}
zbP.onmouseout = function () {
    zcTime = setInterval(function () {

        if (picIndex > zcOis.length - 1) {
            picIndex = 0;
            zcLB.style.left = -0 + "px";
        }
        picIndex++;

        var target = -zImgWidth * picIndex;

        animate(zcLB, { "left": target });
        for (var i = 0; i < zcOis.length; i++) {
            zcOis[i].removeAttribute("class");
        }
        var ind = picIndex;
        ind = ind > zcOis.length - 1 ? 0 : ind;
        zcOis[ind].setAttribute("class", "olred");

    }, 3000);
}







