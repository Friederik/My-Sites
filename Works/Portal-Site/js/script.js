var slide = document.getElementById('slide');
slide.onmousedown = function(e) {
  slide.style.transition = '0s';
  var curX = e.clientX;
  var left = slide.offsetLeft;
  var oldCurX = 10;
  slide.onmousemove = function(e) {
    if (slide.offsetLeft < 1 || e.clientX < oldCurX) {
      oldCurX = e.clientX;
      slide.style.left = left - (curX - e.clientX) + 'px';
    }
  }
  slide.onmouseup = function(e) {
    slide.style.transition = '0.2s';
    slide.style.left = (oldCurX < curX) ? -slide.offsetWidth + 50 + 'px' : '0px';
    slide.onmousemove = null;
  }
}