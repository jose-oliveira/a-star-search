class GreyScaleArrayHelper{
  static toGreyScaleArray(imageData){
    var imageDataLength = imageData.data.length;
    var width = imageData.width;
    var height = imageData.height;
    var greyScaleArray = [];
    for(var i = 0; i < height; i++){
      greyScaleArray[i] = [];
      for(var j = 0; j < width; j++){
        var imageDataIndex = (i * width + j) * 4;
        //@TODO Allow selection of grey scale transformation for comparison
        var avg = (imageData.data[imageDataIndex] + imageData.data[imageDataIndex+1] + imageData.data[imageDataIndex+2]) / 3;
        greyScaleArray[i][j] = parseInt(avg);
      }
    }
    return greyScaleArray;
  }

  static fromGreyScaleArray(greyScaleArray){
      var height = greyScaleArray.length;
      var width = greyScaleArray[0].length;
      var imageData = new ImageData(width, height);

      for(var i in greyScaleArray){
        for(var j in greyScaleArray[i]){
          //Forcing indexes to be integers.
          //Necessary to avoid calculation mistakes: if multiplying, JS treats
          //index as number, if adding as string.
          i = parseInt(i);
          j = parseInt(j);
          var imageDataIndex = (i * width + j) * 4;
          imageData.data[imageDataIndex] = imageData.data[imageDataIndex+1] = imageData.data[imageDataIndex+2] = greyScaleArray[i][j];
          //Sets alpha to 255. @TODO Maybe save this somewhere to restore later.
          imageData.data[imageDataIndex+3] = 255;
        }
      }
      return imageData;
  }

  static applyGradient(greyScaleArray, gradient){
    var returnArray = [];

    //@TODO Break this horrible nest into statics.
    for(var i in greyScaleArray){
      returnArray[i] = [];
      for(var j in greyScaleArray[i]){
        var newColor = 0;
        for(var k in gradient){
          for(var l in gradient[k]){
            //Forcing indexes to be integers.
            //Necessary to avoid calculation mistakes: if multiplying, JS treats
            //index as number, if adding as string.
            //@TODO Find a less disgusting way of doing this.
            i = parseInt(i);
            j = parseInt(j);
            k = parseInt(k);
            l = parseInt(l);
            var color = Array2DHelper.get2DArrayValue(greyScaleArray, i+k, j+l);
            newColor += gradient[k][l]*color;
          }
        }
        returnArray[i][j] = newColor;
      }
    }
    return returnArray;
  }
}
