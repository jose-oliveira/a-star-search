class CanvasUtils{

  static get CANVASCONSTS () {
    const canvas = document.querySelector("#path canvas");
    return {
      CANVAS: canvas,
      CTX: canvas.getContext("2d"),
      POINTRADIUS: 10,
      INITIALCOLOR: '#000',
      VISITEDCOLOR: '#F00',
      ANIMTIME: 1000
    };
  }

  static clearCanvas(){
    CanvasUtils.CANVASCONSTS.CTX.clearRect(0, 0, CanvasUtils.CANVASCONSTS.CANVAS.width, CanvasUtils.CANVASCONSTS.CANVAS.height);
  }

  static initPathDraw (color){
    CanvasUtils.CANVASCONSTS.CTX.beginPath();

    CanvasUtils.CANVASCONSTS.CTX.fillStyle = color;
    CanvasUtils.CANVASCONSTS.CTX.strokeStyle = color;
  }
}
