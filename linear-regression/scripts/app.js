(function(document) {

  var points = [], traced;

  CanvasUtils.CANVASCONSTS.CANVAS.addEventListener('dblclick', addPoint);

  document.querySelector("#traceLine").addEventListener('click', traceLine);
  document.querySelector("#clear").addEventListener('click', clear);

  function addPoint(e){
    if(traced){
      clear();
      traced = false;
    }
    const x = e.offsetX, y = e.offsetY;
    const point = new Point({
      "x" : x,
      "y" : y,
    });
    points.push(point);
    point.draw();
  }

  function traceLine(){
    var linearRegression = new LinearRegression(points);
    linearRegression.traceLine();
    traced = true;
  }

  function clear(){
    points = [];
    CanvasUtils.clearCanvas();
  }
})(document);
