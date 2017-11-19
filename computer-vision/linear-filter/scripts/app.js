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
    var filterName = document.querySelector("#filter").value;
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height );
    var imageData = context.getImageData(0, 0, image.width, image.height);
    var imageDataGreyScaleArray = GreyScaleArrayHelper.toGreyScaleArray(imageData);
    var edgesArray = LinearFilterEdgeDetector.getAllEdges(imageDataGreyScaleArray, new Filter(filterName));
    imageData = GreyScaleArrayHelper.fromGreyScaleArray(edgesArray);
    context.putImageData(imageData, 0, 0);
  }
}
