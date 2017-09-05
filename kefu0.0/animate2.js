/**
 * Created by ���� on 2017/7/10.
 */
//-------------------------------------------------------
function animate2(obj, target) {
  clearInterval(obj.timerId);
  obj.timerId = setInterval(function () {
    var currentLeft = obj.offsetTop;
    var step = currentLeft < target ? 10 : -10;
    currentLeft += step;
    //-------------------------------------------------------
    //--------------------------------------------------------
    if (Math.abs(target - currentLeft) < Math.abs(step)) {
      clearInterval(obj.timerId);
      obj.style.top = target + "px";
    } else {
      obj.style.top = currentLeft + "px";
    }
    //console.log("1");
  }, 30);
}