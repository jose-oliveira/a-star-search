class GaussianFilter{
  //Filter from: https://en.wikipedia.org/wiki/Canny_edge_detector
  //@TODO Make this configurable
  static gaussianFilter(){
    var divider = 159;
    return [[2/divider,4/divider,5/divider,4/divider,2/divider],[4/divider,9/divider,12/divider,9/divider,4/divider],[5/divider,12/divider,15/divider,12/divider,5/divider],[4/divider,9/divider,12/divider,9/divider,4/divider],[2/divider,4/divider,5/divider,4/divider,2/divider]];
  }
}
