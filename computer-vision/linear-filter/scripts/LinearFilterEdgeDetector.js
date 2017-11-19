class LinearFilterEdgeDetector{
  static getVerticalEdges(greyScaleArray, filter){
    var verticalEdgesGradient = filter;
    var verticalEdges = GreyScaleArrayHelper.applyGradient(greyScaleArray, verticalEdgesGradient);
    return verticalEdges;
  }

  static getHorizontalEdges(greyScaleArray, filter){
    var horizontalEdgesGradient = filter;
    var horizontalEdges = GreyScaleArrayHelper.applyGradient(greyScaleArray, horizontalEdgesGradient);
    return horizontalEdges;
  }

  static getAllEdges(greyScaleArray, filter){
    var horizontalEdges = this.getHorizontalEdges(greyScaleArray, filter.horizontal);
    var verticalEdges = this.getVerticalEdges(greyScaleArray, filter.vertical);
    //Edge array equals the square root of the sum of the squares of the
    //horizontal and vertical arrays.
    var edgesArray = Array2DHelper.pow2DMArray(Array2DHelper.sum2DArrays(Array2DHelper.pow2DMArray(horizontalEdges, 2), Array2DHelper.pow2DMArray(verticalEdges, 2)),0.5);

    return edgesArray;
  }
}
