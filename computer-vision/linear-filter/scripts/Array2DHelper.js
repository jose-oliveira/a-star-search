class Array2DHelper{
  //@TODO For now this is just fixing the issue of borders: if no value, assume
  //border color is black(0). Make this more generic.
  static get2DArrayValue(array, i, j){
    return typeof array[i] == "undefined" ? 0 : array[i][j];
  }

  static pow2DMArray(array, exponent){
    for(var i in array){
      for(var j in array){
        array[i][j] = Math.pow(array[i][j], exponent);
      }
    }
    return array;
  }

  //Assumes arrays are of the same size.
  static sum2DArrays(array1, array2){
    for(var i in array1){
      for(var j in array1){
        array1[i][j] += array2[i][j];
      }
    }
    return array1;
  }
}
