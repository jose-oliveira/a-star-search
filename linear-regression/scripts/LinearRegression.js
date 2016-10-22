class LinearRegression{

  constructor (points){
    this.points = points;
  }

  traceLine (){
    const sumXY = this.sumOfProducts();
    const sumX = this.sumOfProperty("x");
    const sumY = this.sumOfProperty("y");
    const sumX2 = this.sumOfPropertySquare("x");
    const M = this.points.length;

    const w1 = (M * sumXY - sumX * sumY) / (M * sumX2 - Math.pow(sumX, 2));
    const w0 = sumY / M - (w1 * sumX) / M;

    const p1X = -w0 / w1;
    const p2Y = CanvasUtils.CANVASCONSTS.CANVAS.width;
    const p2X = (p2Y - w0) / w1;

    const p1 = new Point({
      "x" : p1X,
      "y" : 0,
    });
    const p2 = new Point({
      "x" : p2X,
      "y" : p2Y,
    });

    p1.drawConnection(p2);
  }

  sumOfProducts (){
    var result = 0;
    for(var index in this.points){
      var point = this.points[index];
      result += point.x * point.y;
    }
    return result;
  }

  sumOfProperty(property){
    var result = 0;
    for(var index in this.points){
      var point = this.points[index];
      result += point[property];
    }
    return result;
  }

  sumOfPropertySquare(property){
    var result = 0;
    for(var index in this.points){
      var point = this.points[index];
      result += Math.pow(point[property], 2);
    }
    return result;
  }
}
