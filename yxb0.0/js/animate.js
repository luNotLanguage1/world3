/**
 * Created by Administrator on 2017/7/15.
 */
// function animate(obj,json,fn){
//     clearInterval(obj.timerId);
//     obj.timerId = setInterval(function(){
//         var flag = true
//         for(var key in json){
//             if(key == "opacity"){
//                 var current = getStyle(obj,key)*100;
//                 var step = (json[key]*100 - current) / 10
//                 step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                 current += step;
//                 obj.style[key] = current/100;
//                 if(current/100 != json[key]){
//                     flag = false;
//                 }
//             }else if(key == "zIndex"){
//                 var current = getStyle(obj,key)
//                 obj.style[key] = json[key];
//                 if(current != json[key]){
//                     flag = false;
//                 }
//             }else{
//                 var current = parseInt(getStyle(obj,key));
//                 var step = (json[key] - current) / 10;
//                 step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                 current += step;
//                 obj.style[key] = current + "px";
//                 if(current != json[key]){
//                     flag = false;
//                 }
//             }
//         }
//         if(flag){
//             clearInterval(obj.timerId);
//             if(typeof fn == "function"){
//                 fn()
//             }
//         }
//     },50)
// }


//封装缓动动画animate函数
// function animate(obj, json, fn) {
//     clearInterval(obj.timerId);
//     obj.timerId = setInterval(function () {
//         //假设这一次所有的属性都已经到达了目的位置。
//         var flag = true;

//         //在计时器里面，要把所有的属性都取出来，然后让他们都到达目的位置
//         for (var key in json) {
//             //此时这里的key就是要移动或者要改变的属性。
//             //json[key] ，就是你这个属性要到达的目的位置。

//             //获取传入的这个属性的当前的值。 要把px给去掉
//             var current = parseInt(getStyle(obj, key));

//             //如果你的目标位置比当前位置要大，步长就要向上取整，
//             //如果你的目标位置比当前位置要小，步长就要想下取值。
//             var step = (json[key] - current) / 10;
//             step = step > 0 ? Math.ceil(step) : Math.floor(step);

//             current += step;

//             //给传入的这个属性  重新赋值
//             obj.style[key] = current + "px";

//             //如果这个属性的值不等于目的位置，所以此次假设失败。
//             if (current != json[key]) {
//                 flag = false;
//             }
//         }

//         //所有的属性都到达了目的位置，才可以清空计时器。
//         if (flag == true) {
//             clearInterval(obj.timerId);
//             //此时动画停下来了，停下来了继续做事情
//             if (typeof fn == "function") {
//                 fn();
//             }
//         }


//         console.log(step + ":" + current);
//     }, 50);
// }


//获取元素的样式的值-兼容函数
function getStyle(obj, attr) {
    //能力检测-检测执行当前这个代码的浏览器支持不支持这个东西
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
} function animate(obj, target) {
    clearInterval(obj.timerId);
    obj.timerId = setInterval(function () {
        var currenLeft = obj.offsetLeft;
        var step = currenLeft < target ? 10 : -10;
        currenLeft += step;
        if (Math.abs(target - currenLeft) < (Math.abs(step))) {
            clearInterval(obj.timerId);
            obj.style.left = target + "px";
        } else {
            obj.style.left = currenLeft + "px";
        }
    }, 30)
}

