class LinearFilterEdgeDetector{
  static getVerticalEdges(greyScaleArray, filterArray){
    var verticalEdgesGradient = filterArray;
    var verticalEdges = GreyScaleArrayHelper.applyGradient(greyScaleArray, verticalEdgesGradient);
    return verticalEdges;
  }

  static getHorizontalEdges(greyScaleArray, filterArray){
    var horizontalEdgesGradient = filterArray;
    var horizontalEdges = GreyScaleArrayHelper.applyGradient(greyScaleArray, horizontalEdgesGradient);
    return horizontalEdges;
  }

  static getAllEdges(greyScaleArray, filterObject, applyGaussianFilter){

    //Don't apply Gaussian filter by default for performance reasons.
    if(applyGaussianFilter){
      greyScaleArray = GreyScaleArrayHelper.applyGradient(greyScaleArray, GaussianFilter.gaussianFilter());
    }

    var horizontalEdges = this.getHorizontalEdges(greyScaleArray, filterObject.horizontal);
    var verticalEdges = this.getVerticalEdges(greyScaleArray, filterObject.vertical);
    //Edge array equals the square root of the sum of the squares of the
    //horizontal and vertical arrays.
    var edgesArray = Array2DHelper.pow2DMArray(Array2DHelper.sum2DArrays(Array2DHelper.pow2DMArray(horizontalEdges, 2), Array2DHelper.pow2DMArray(verticalEdges, 2)),0.5);

    return edgesArray;
  }
}
