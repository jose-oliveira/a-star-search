//@TODO Improve coding standards.
window.onload = function() {

  var videoElement = document.querySelector("#videoElement");
  var webCamVideoHandler = new WebCamVideoHandler(videoElement);

  var imageElement = document.querySelector('#image');

  var videoTimeout;

  selectSourceAndApplyFilter();
  document.querySelector("#apply").addEventListener('click', selectSourceAndApplyFilter);

  function selectSourceAndApplyFilter(){
    source = document.querySelector("#source");
    switch (source.value) {
      case 'video':
        applyFilterToVideo();
        break;
      default: loadImageAndApplyFilter();

    }
  }

  function loadImageAndApplyFilter(){

    hideElement(videoElement);
    showElement(imageElement);

    if(!videoElement.paused){
      webCamVideoHandler.stop();
      clearTimeout(videoTimeout);
    }

    var selectImageSrc = document.querySelector("#selectImage").value;
    if(selectImageSrc == imageElement.getAttribute("src")){
      drawImageFilter(imageElement);
      return;
    }

    var selectImage = new Image();
    selectImage.src = selectImageSrc;
    selectImage.onload = function(){
        imageElement.setAttribute("src", this.getAttribute("src"));
        drawImageFilter(imageElement);
    };
  }

  function applyFilterToVideo(){

    hideElement(imageElement);
    showElement(videoElement);

    if(videoElement.paused){
      webCamVideoHandler.play();
      videoTimeout = setInterval(function(){
          drawImageFilter(videoElement);
        }, 5000);
    }
    var filterName = document.querySelector("#filter").value;
  }

  function drawImageFilter(image){

    var canvas = document.querySelector('#canvas');
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

  function hideElement(element){
    element.style.display = "none";
  }

  function showElement(element){
    element.style.display = "";
  }

}
