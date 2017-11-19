//@TODO Improve coding standards.
window.onload = function() {

  loadImageAndDrawEdges();
  document.querySelector("#apply").addEventListener('click', loadImageAndDrawEdges);

  function loadImageAndDrawEdges(){

    var image = document.getElementById('image');
    var selectImageSrc = document.querySelector("#selectImage").value;
    if(selectImageSrc == image.src){
      drawImageEdges(image);
      return;
    }

    var selectImage = new Image();
    selectImage.src = selectImageSrc;
    selectImage.onload = function(){
        image.src = this.src;
        drawImageEdges(image);
    };
  }

  function drawImageEdges(image){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    var filterName = document.querySelector("#filter").value;

    context.drawImage(image, 0, 0, canvas.width, canvas.height );

    var imageData = context.getImageData(0, 0, image.width, image.height);
    var imageDataGreyScaleArray = GreyScaleArrayHelper.toGreyScaleArray(imageData);
    var imageWithFilter = applyFilter(imageDataGreyScaleArray, filterName);

    imageData = GreyScaleArrayHelper.fromGreyScaleArray(imageWithFilter);
    context.putImageData(imageData, 0, 0);
  }

  function applyFilter(greyScaleArray, filterName){
    switch (filterName) {
      case 'grey':
        return greyScaleArray;
      case 'gaussian':
        return GreyScaleArrayHelper.applyGradient(greyScaleArray, GaussianFilter.gaussianFilter());
      default:
        return LinearFilterEdgeDetector.getAllEdges(greyScaleArray, new Filter(filterName));
    }
  }
}
