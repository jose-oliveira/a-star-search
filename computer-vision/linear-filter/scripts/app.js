//@TODO Improve coding standards.
window.onload = function() {

  //@TODO Make this selectable and collect some benchmarks
  //With image
  loadImageAndApplyFilter();
  document.querySelector("#apply").addEventListener('click', loadImageAndApplyFilter);
/*
  //With video
  var video = document.querySelector("#videoElement");
  document.querySelector("#apply").addEventListener('click', function(){
    filterName = document.querySelector("#filter").value;
  });

  startTimeout();
  function startTimeout(){
    setInterval(function(){
      drawImageFilter(video);
    }, 3000);
  }
*/
  function loadImageAndApplyFilter(){

    var image = document.getElementById('image');
    var selectImageSrc = document.querySelector("#selectImage").value;
    if(selectImageSrc == image.getAttribute("src")){
      drawImageFilter(image);
      return;
    }

    var selectImage = new Image();
    selectImage.src = selectImageSrc;
    selectImage.onload = function(){
        image.setAttribute("src", this.getAttribute("src"));
        drawImageFilter(image);
    };
  }

  function drawImageFilter(image){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height );

    var filterName = document.querySelector("#filter").value;

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
