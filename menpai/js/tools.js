/**
 * Created by lenovo on 2017-07-11.
 */
/**
 *
 * @param ele
 * @param key
 * @returns {*}
 */
function getStyle(ele,key) {
    if (ele.currentStyle) {//如果调用这个方法结果不是undefined 就是ie8-
        return ele.currentStyle[key];
    }else {//支持谷歌以及ie9+
        // console.log("ie9+");
        return getComputedStyle(ele,null)[key];
    }
}

/***
 *
 * @param ele
 * @param json
 * @param function
 */
function animate(ele,json,fn) {
    clearInterval(ele.timerId);
    ele.timerId = setInterval(function () {
        var flag = true;
        for( var key in json ) {
            if (key == "opacity") {
                var nowLeft = getStyle(ele,key) * 100;
                var step = (json[key] * 100 - nowLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                nowLeft += step;
                ele.style[key] = nowLeft / 100;
                if ( nowLeft / 100 != json[key] ) {
                    flag = false;
                }
            }else if ( key == "zIndex" ) {
                var nowLeft = +getStyle(ele,key);
                var step = json[key] - nowLeft >= 0 ? 1 : -1;
                nowLeft += step;
                ele.style[key] = nowLeft;
                if ( nowLeft != json[key] ) {
                    flag = false;
                }
            }else{
                var nowLeft = parseInt(getStyle(ele,key));
                var step = (json[key] - nowLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                nowLeft += step;
                ele.style[key] = nowLeft + "px";
                if ( nowLeft != json[key] ) {
                    flag = false;
                }
            }
        }
        if(flag) {
            clearInterval(ele.timerId);
            if (typeof fn == "function") {
                fn();
            }
        }
        // console.log("计时器");
    },40);
}

/***
 * 获取屏幕的w和h
 * @returns {{clientWidth: (Number|number), clientHeight: (Number|number)}}
 */
function getClient() {
    return {
        clientWidth :　window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

/***
 * 获取滚动的位置
 * @returns {{scrollLeft: (Number|number), scrollTop: (Number|number)}}
 */
function getscroll() {
    return {
        scrollLeft : window.pageXOffset || document.documentElement.scrollLeft|| document.body.scrollLeft || 0,
        scrollTop : window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop || 0
    };
}
/**
 *
 * @param e
 * @returns {{pageX: *, pageY: *}}
 */
function getPage(e) {
    return {
        pageX : e.pageX || e.clientX + document.documentElement.scrollLeft,
        pageY : e.pageY || e.clientY + document.documentElement.scrollTop
    };
}

//ie 移除事件做兼容
/***
 *
 * @param ele
 * @param type
 * @param listener
 * @returns {*}
 */
function removeEvent(ele,type,listener) {
    if (ele.removeEventListener) {
        return ele.removeEventListener(type,listener,false);
    }else {
        return ele.detachEvent("on"+type,listener);
    }
}

// 设置事件兼容处理
/***
 *
 * @param ele
 * @param type
 * @param listener
 * @returns {*}
 */
function setEvent(ele,type,listener) {
    if (ele.addEventListener) {
        return ele.addEventListener(type,listener,false);
    }else {
        return ele.attachEvent("on"+type,listener,false);
    }
}

//对ie8的支持
/***
 *
 * @param e
 */
function stopPropagation(e) {
    if (e.stopPropagation) {//ie8不支持
        e.stopPropagation();
    }else {
        e.cancelBubble = true;
    }
}

function animate1(ele,json,fn) {
    clearInterval(ele.timerId);
    ele.timerId = setInterval(function () {
        var flag = true;
        for( var key in json ) {
            if (key == "opacity") {
                var nowLeft = getStyle(ele,key) * 100;
                var step = (json[key] * 100 - nowLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                nowLeft += step;
                ele.style[key] = nowLeft / 100;
                if ( nowLeft / 100 != json[key] ) {
                    flag = false;
                }
            }else if ( key == "zIndex" ) {
                var nowLeft = +getStyle(ele,key);
                var step = json[key] - nowLeft >= 0 ? 1 : -1;
                nowLeft += step;
                ele.style[key] = nowLeft;
                if ( nowLeft != json[key] ) {
                    flag = false;
                }
            }else{
                var nowLeft = parseInt(getStyle(ele,key));
                var step = (json[key] - nowLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                nowLeft += step;
                ele.style[key] = nowLeft + "px";
                if ( nowLeft != json[key] ) {
                    flag = false;
                }
            }
        }
        if(flag) {
            clearInterval(ele.timerId);
            if (typeof fn == "function") {
                fn();
            }
        }
        // console.log("计时器");
    },40);
}