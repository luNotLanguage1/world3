/**
 * Created by Administrator on 2017/7/18.
 */
$(function () {

    // $('#search_button').click(function () {
    //     alert("您输入的名字不存在")
    // })
    //排行榜与小工具开始
    $('.DropMenu>ul>li').mouseenter(function () {
        $(this).children('ul').css('display', 'block')
    }).mouseleave(function () {
        $(this).children('ul').css('display', 'none')
    })
    var color;
    $('.dList1>li').mouseenter(function () {
        color = $(this).css('backgroundColor')
        $(this).css('backgroundColor', '#fa6432')
        $(this).children('ul').css({
            'display': 'block',
        })
    }).mouseleave(function () {
        $(this).css('backgroundColor', '#575758')
        $(this).children('ul').css('display', 'none')
    })

    $('.cenr>li').mouseenter(function () {
        color = $(this).css('backgroundColor')
        $(this).css('backgroundColor', '#fa6432')
    }).mouseleave(function () {
        $(this).css('backgroundColor', color)
    })
    //排行榜与小工具结束
    //排行榜门派查询开始
    $('.xiuwei').mouseenter(function () {
        $(this).children('ul').stop(true);
        $(this).children('ul').slideDown(100);
    }).mouseleave(function () {
        $(this).children('ul').slideUp(100)
    })
    $('.xiuwei>ul>li').mouseenter(function () {
        color = $(this).css('backgroundColor')
        $(this).css('backgroundColor', '#ff7d00')
    }).mouseleave(function () {
        $(this).css('backgroundColor', color)
    })
    $('.xiuwei>ul>li').click(function () {
        var str = $(this).html();
        $(this).parent().siblings().html(str);
        $(this).parent().hide();
    })


    //排行榜门派查询结束
    //底部开始第三方登录开始
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
    //底部开始第三方登录结束
    //关闭悬浮新闻
    $('#off').click(function () {
        $(this).parents('div').fadeOut();
    })






})

//输入框获得焦点
window.onload = function () {
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
    //生成表格的开始
    var arr = ["排名", "角色", "大区", "服务器", "等级", "门派", "势力", "人物修为", "装备评价", "总修为"];
    var tab = id("table")
    var headtr = document.createElement("tr");
    for (var i = 0; i < arr.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = arr[i];
        headtr.appendChild(th);
    }
    tab.appendChild(headtr);
    var obj = [
        { 'number': '1', 'role': '与我沉睡', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '云麓仙居', 'force': '那个势力', 'quality': '74435', 'equip': '124432', 'total': '198867' },
        { 'number': '2', 'role': '风度翩翩发小型', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '荒火教', 'force': '星火燎原', 'quality': '72625', 'equip': '111048', 'total': '183673' },
        { 'number': '3', 'role': '乄不知道灬', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '那个势力', 'quality': '72358', 'equip': '118566', 'total': '190924' },
        { 'number': '4', 'role': '丷明神丷', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '荒火教', 'force': '决战丶', 'quality': '72003', 'equip': '115060', 'total': '187063' },
        { 'number': '5', 'role': '乄枭匪匪丶', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '荒火教', 'force': '戰月', 'quality': '71667', 'equip': '118263', 'total': '189930' },
        { 'number': '6', 'role': '恰逢其會乀', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '荒火教', 'force': '破军', 'quality': '71655', 'equip': '110390', 'total': '182045' },
        { 'number': '7', 'role': '乄筱晚晚丶', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '戰月', 'quality': '71483', 'equip': '116014', 'total': '187497' },
        { 'number': '8', 'role': '草木', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '太虚观', 'force': '一生所爱', 'quality': '71317', 'equip': '104826', 'total': '176143' },
        { 'number': '9', 'role': '乄予你开心灬', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '天机营', 'force': '戰月', 'quality': '71144', 'equip': '117371', 'total': '188515' },
        { 'number': '10', 'role': '乀西劫', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '戰月', 'quality': '70775', 'equip': '121327', 'total': '192102' },
        { 'number': '11', 'role': '懒人汐汐', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '破军', 'quality': '70699', 'equip': '110384', 'total': '181083' },
        { 'number': '12', 'role': '波卑夜', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '幽篁国', 'force': '情聚', 'quality': '70649', 'equip': '111145', 'total': '181794' },
        { 'number': '13', 'role': '金罐子', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '天机营', 'force': '', 'quality': '70394', 'equip': '97847', 'total': '168241' },
        { 'number': '14', 'role': '丶南风有归', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '云麓仙居', 'force': '破军', 'quality': '70271', 'equip': '114218', 'total': '184489' },
        { 'number': '15', 'role': '腥红之月丷', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '破军', 'quality': '70134', 'equip': '109023', 'total': '179157' },
        { 'number': '16', 'role': '迅捷斥候丷', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '云麓仙居', 'force': '破军', 'quality': '69759', 'equip': '112428', 'total': '182187' },
        { 'number': '17', 'role': '乄予你心安灬', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '戰月', 'quality': '69573', 'equip': '111191', 'total': '180764' },
        { 'number': '18', 'role': '丷小妖児', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '傳说', 'quality': '69161', 'equip': '103226', 'total': '172387' },
        { 'number': '19', 'role': '池醉乀', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '荒火教', 'force': '那个势力', 'quality': '69137', 'equip': '112282', 'total': '181419' },
        { 'number': '20', 'role': '安知允乀', ' area': '广东区', 'server': '白云山', 'grade': '80', 'school': '冰心堂', 'force': '破军', 'quality': '69133', 'equip': '112609', 'total': '181742' },
    ]

    for (var i = 0; i < obj.length; i++) {
        var tr = document.createElement("tr");
        for (var key in obj[i]) {
            var td = document.createElement("td");
            setText(td, obj[i][key])
            tr.appendChild(td);
        }
        if (i % 2 == 0) {
            tr.style.backgroundColor = "#353b3e"
        } else {
            tr.style.backgroundColor = "#242729"
        }
        var color;
        var color1;
        tr.onmouseenter = function () {
            color = this.style.backgroundColor;
            color1 = this.style.color;
            this.style.color = "#ffffff"
            this.style.backgroundColor = "#ff7d01"
        }
        tr.onmouseleave = function () {
            this.style.color = color1
            this.style.backgroundColor = color
        }
        tab.appendChild(tr);
    }

    ///生成表格的结束
    var news = document.getElementById('news');
    var off = document.getElementById('off');
    off.onclick = function () {
        animate(news, {
            'width': 0
        })
    }



    //封装缓动动画animate函数
    function animate(obj, json, fn) {
        clearInterval(obj.timerId);
        obj.timerId = setInterval(function () {
            //假设这一次所有的属性都已经到达了目的位置。
            var flag = true;

            //在计时器里面，要把所有的属性都取出来，然后让他们都到达目的位置
            for (var key in json) {
                //此时这里的key就是要移动或者要改变的属性。
                //json[key] ，就是你这个属性要到达的目的位置。

                //获取传入的这个属性的当前的值。 要把px给去掉
                var current = parseInt(getStyle(obj, key));

                //如果你的目标位置比当前位置要大，步长就要向上取整，
                //如果你的目标位置比当前位置要小，步长就要想下取值。
                var step = (json[key] - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);

                current += step;

                //给传入的这个属性  重新赋值
                obj.style[key] = current + "px";

                //如果这个属性的值不等于目的位置，所以此次假设失败。
                if (current != json[key]) {
                    flag = false;
                }
            }

            //所有的属性都到达了目的位置，才可以清空计时器。
            if (flag == true) {
                clearInterval(obj.timerId);
                //此时动画停下来了，停下来了继续做事情
                if (typeof fn == "function") {
                    fn();
                }
            }



        }, 50);
    }


    //获取元素的样式的值-兼容函数
    function getStyle(obj, attr) {
        //能力检测-检测执行当前这个代码的浏览器支持不支持这个东西
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return window.getComputedStyle(obj, null)[attr];
        }
    }








}

