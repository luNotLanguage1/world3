/**
 * Created by Administrator on 2017/7/15.
 */
// 排行榜的开始
$(function () {
    $('.dList1>ul>li').mouseenter(function () {
        $(this).children('ul').css({
            'display': 'block',
            'opacity': '0.9',
            'backgroundColor': "#353b3e"
        })
    }).mouseleave(function () {
        $(this).children('ul').css('display', 'none')
    })
    var color;
    $('.dList1>ul>li>ul>li').mouseenter(function () {
        color = $(this).css('backgroundColor');
        $(this).css({
            'backgroundColor': '#f8622e',
            'color': '#f1efee'
        })
    }).mouseleave(function () {
        $(this).css({
            'backgroundColor': color,
            'color': '#9e9e9e'
        });
    })
    //排行榜的结束
    //输入框的开始
    // $('#search_button').click(function () {
    //     alert("您输入的名字不存在")
    // })
    //输入框的结束
    //左边新闻的开始
    $('#tab-1>li').mouseenter(function () {
        $('#tab-1>li').removeClass('current');
        $(this).addClass('current')

        var index = $(this).index();

        var $bou = $('#tabcon-1>ul').eq(index)

        $('#tabcon-1>ul').hide();

        $bou.show()

    })
    $('.tabcon-1>a').mouseenter(function () {
        $(this).css('color', '#ff7d00')
    }).mouseleave(function () {
        $(this).css('color', '#b3b3b3')
    })
})
//左边新闻的结束
//第三方登录的开始
$(function () {
    $('.last').mouseenter(function () {
        $(this).children('ul').show()
    }).mouseleave(function () {
        $(this).children('ul').hide()
    })
    $('.link>li').mouseenter(function () {
        color = $(this).css('backgroundColor')
        $(this).css('backgroundColor', '#e0e0e0')
    }).mouseleave(function () {
        $(this).css('backgroundColor', color)
    })



})
//第三方登录的结束













window.onload = function () {
    //输入框获得焦点事件的开始
    var imp = document.getElementById("import");
    imp.onfocus = function () {
        if (imp.value = "请输入角色名") {
            imp.value = ""
        }
    }
    imp.onblur = function () {
        if (imp.value = "") {
            imp.value = "请输入角色名";
        }
    }
    //输入框获得焦点事件的结束
    //左边新闻的开始
    var news = document.getElementById("news");
    var neLi = news.children;
    var faqs = document.getElementById("faqs");
    var faqsLi = faqs.children;
    var fats = document.getElementById("fats");
    var fatsLi = fats.children;
    var answers = document.getElementById("answers");
    var ul1 = answers.children[0];
    var ulli = ul1.children;
    for (var i = 0; i < neLi.length; i++) {
        neLi[i].setAttribute("index", i);
        neLi[i].onclick = function () {
            for (var j = 0; j < ulli.length; j++) {
                ulli[j].removeAttribute("class", "current");

            }
            for (var k = 0; k < neLi.length; k++) {
                neLi[k].children[0].style.color = "#b3b3b3"
            }
            ulli[this.getAttribute("index")].setAttribute("class", "current")
            this.children[0].style.color = "#ff7d00"
        }
    }


    for (var i = 0; i < faqsLi.length; i++) {
        faqsLi[i].setAttribute("index", i + neLi.length);
        faqsLi[i].onclick = function () {
            for (var j = 0; j < ulli.length; j++) {
                ulli[j].removeAttribute("class", "current");
            }
            for (var k = 0; k < faqsLi.length; k++) {
                faqsLi[k].children[0].style.color = "#b3b3b3"
            }
            ulli[this.getAttribute("index")].setAttribute("class", "current")
            this.children[0].style.color = "#ff7d00"
        }
    }

    for (var i = 0; i < fatsLi.length; i++) {
        fatsLi[i].setAttribute("index", i + neLi.length + faqsLi.length);
        fatsLi[i].onclick = function () {
            for (var j = 0; j < ulli.length; j++) {
                ulli[j].removeAttribute("class", "current");
            }
            for (var k = 0; k < fatsLi.length; k++) {
                fatsLi[k].children[0].style.color = "#b3b3b3"
            }
            ulli[this.getAttribute("index")].setAttribute("class", "current")
            this.children[0].style.color = "#ff7d00"
        }
    }

    //左边新闻的结束

    //轮播图开始
    var box = document.getElementById("box");
    var screen = box.children[0];
    var ul1 = screen.children[0];
    var ol1 = screen.children[1];
    var ul1Lis = ul1.children;
    var imgWidth = screen.offsetWidth;
    for (var i = 0; i < ul1Lis.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("index", i);
        ol1.appendChild(li);
    }
    var ol1lis = ol1.children;
    ol1lis[0].setAttribute("class", "current");

    for (var i = 0; i < ol1lis.length; i++) {
        ol1lis[i].onclick = function () {
            for (var j = 0; j < ol1lis.length; j++) {
                ol1lis[j].removeAttribute("class");
            }
            this.setAttribute("class", "current");
            var target = -this.getAttribute("index") * imgWidth;
            animate(ul1, target);
            picIndex = spanIndex = this.getAttribute("index");
        }
    }
    box.onmouseover = function () {
        clearInterval(timerId);
    }
    box.onmouseout = function () {
        timerId = setInterval(nextImg, 3000);
    }
    var picIndex = 0;
    ul1.appendChild(ul1Lis[0].cloneNode(true));
    var spanIndex = 0;
    function nextImg() {
        if (picIndex == ul1.children.length - 1) {
            picIndex = 0;
            ul1.style.left = 0 + "px";
        }
        picIndex++;
        var target = -picIndex * imgWidth;
        animate(ul1, target);
        for (var i = 0; i < ol1lis.length; i++) {
            ol1lis[i].removeAttribute("class");
        }
        if (spanIndex < ol1lis.length - 1) {
            spanIndex++;
        } else {
            spanIndex = 0;
        }
        ol1lis[spanIndex].setAttribute("class", "current");
    }
    var timerId = null;
    timerId = setInterval(nextImg, 3000);
    //轮播图结束








}











