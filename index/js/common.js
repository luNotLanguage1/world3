/**
 * Created by Administrator on 2017/4/14.
 */
/**
 * 封装了一个兼容版本的获取标签间内容的函数
 * @param ele
 * @returns {*}
 */
function getText(ele) {
  // 能力检测    就是要看当前的浏览器是否支持此对象的属性或是方法
  if (ele.innerText) {
    return ele.innerText;
//      return 2;
  } else {
    return ele.textContent;
//      return 20;
  }
}

/**
 * 封装了一个兼容版本的设置标签间内容的函数
 * @param ele
 * @param value
 */
function setText(ele, value) {
  if (typeof ele.innerText == "string") {
    ele.innerText = value;
  } else {
    ele.textContent = value;
  }
}

var Txt = {
  getText: function (ele) {
    // 能力检测    就是要看当前的浏览器是否支持此对象的属性或是方法
    if (ele.innerText) {
      return ele.innerText;
    } else {
      return ele.textContent;
    }
  },
  setText: function (ele, value) {
    if (typeof ele.innerText == "string") {
      ele.innerText = value;
    } else {
      ele.textContent = value;
    }
  }
}

var Tag = {
  /**
   * 封装了一个兼容版本的获取下一个标签节点的函数
   * @param ele
   * @returns {*}
   */
  getNextElement: function (ele) { // undefined
    //能力检测  就是要看当前的浏览器是否支持此对象的属性或是方法
    if (ele && ele.nextElementSibling) { // 逻辑   短路运算
      return ele.nextElementSibling;
    } else { // IE8
      if (ele) {
        ele = ele.nextSibling; // 因为下一个节点，有可能是文本、注释、或是标签，所以需要判断节点类型，而且需要用while来判断
        while (ele.nodeType != 1) {
          ele = ele.nextSibling;
        }
        return ele;
      }
    }
  },
  getPreviousElement: function (ele) {
    // 能力检测
    if (ele) {
      if (ele.previousElementSibling) { // 高级浏览器支持的方式
        return ele.previousElementSibling;
      } else {
        ele = ele.previousSibling;
        while (ele.nodeType != 1) {
          ele = ele.previousSibling;
        }
        return ele;
      }
    }
  },
  /**
   * 封装了一个兼容版本的获得第一个子标签节点的函数
   * @param ele
   * @returns {*}
   */
  getFirstElement: function (ele) {
    // 能力检测
    if (ele) {
      if (ele.firstElementChild) {
        return ele.firstElementChild;
      } else {
        ele = ele.firstChild;//先用各浏览器支持的这个属性获得一下第一个子节点
        while (ele.nodeType != 1) {
          ele = ele.nextSibling;
        }
        return ele;
      }
    }
  },
  /**
   * 封装了一个兼容版本的获得最后一个子标签节点的函数
   * @param ele
   * @returns {*}
   */
  getLastElement: function (ele) {
    // 能力检测
    if (ele) {
      if (ele.lastElementChild) {
        return ele.lastElementChild;
      } else {
        ele = ele.lastChild;//先用各浏览器支持的这个属性获得一下第一个子节点
        while (ele.nodeType != 1) {
          ele = ele.previousSibling;
        }
        return ele;
      }
    }
  }
}

var zs = {
  name:"张三",
  age:20,
  sex:"男",
  sayHi:function (){
         console.log();
  }

}


// 对象  属性和方法
/**
 * 封装了一个兼容版本的获取下一个标签节点的函数
 * @param ele
 * @returns {*}
 */
function getNextElement(ele) { // undefined
                               //能力检测  就是要看当前的浏览器是否支持此对象的属性或是方法
  if (ele && ele.nextElementSibling) { // 逻辑   短路运算
    return ele.nextElementSibling;
  } else { // IE8
    if (ele) {
      ele = ele.nextSibling; // 因为下一个节点，有可能是文本、注释、或是标签，所以需要判断节点类型，而且需要用while来判断
      while (ele.nodeType != 1) {
        ele = ele.nextSibling;
      }
      return ele;
    }
  }
}
/**
 * 封装了一个兼容版本的获得上一个标签节点的函数
 * @param ele
 * @returns {*}
 */
function getPreviousElement(ele) {
  // 能力检测
  if (ele) {
    if (ele.previousElementSibling) { // 高级浏览器支持的方式
      return ele.previousElementSibling;
    } else {
      ele = ele.previousSibling;
      while (ele.nodeType != 1) {
        ele = ele.previousSibling;
      }
      return ele;
    }
  }
}


/**
 * 封装了一个兼容版本的获得第一个子标签节点的函数
 * @param ele
 * @returns {*}
 */
function getFirstElement(ele) {
  // 能力检测
  if (ele) {
    if (ele.firstElementChild) {
      return ele.firstElementChild;
    } else {
      ele = ele.firstChild;//先用各浏览器支持的这个属性获得一下第一个子节点
      while (ele.nodeType != 1) {
        ele = ele.nextSibling;
      }
      return ele;
    }
  }
}
/**
 * 封装了一个兼容版本的获得最后一个子标签节点的函数
 * @param ele
 * @returns {*}
 */
function getLastElement(ele) {
  // 能力检测
  if (ele) {
    if (ele.lastElementChild) {
      return ele.lastElementChild;
    } else {
      ele = ele.lastChild;//先用各浏览器支持的这个属性获得一下第一个子节点
      while (ele.nodeType != 1) {
        ele = ele.previousSibling;
      }
      return ele;
    }
  }
}


function id(id){
  return  document.getElementById(id);
}

/**
 * 封装了一个移动所有的option标签的函数
 * @param source
 * @param target
 */
function moveAll(source,target){
  var source = $$(source);
  var target = $$(target);
  var options = source.children;
  for(var i=0;i<options.length;i++){
    target.appendChild(options[i]);
    i--;
  }
}

function moveSel(source,target){
  var source = $$(source);
  var target = $$(target);
  var options = source.children;
  for(var i=0;i<options.length;i++){
    if(options[i].selected){
      target.appendChild(options[i]);
      i--;
    }
  }
}
/**
 * 封装了一个获取页面被卷去的高度或是左侧距离的函数
 * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}
 */
function scroll(){
  return {
    scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    scrollLeft: window.pageXOffset ||document.documentElement.scrollLeft ||document.body.scrollLeft ||0
  };
}


function client(){
  return {
    width:  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    height:window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight || 0
  };
}


function page(e){
  return {
    pageX:e.pageX || e.clientX + document.documentElement.scrollLeft,
    pageY:e.pageY || e.clientY + document.documentElement.scrollTop
  }
}