class CanvasUtils{
  
  static get CANVASCONSTS () {
    const canvas = document.querySelector("#path canvas");
    return {
      CANVAS: canvas,
      CTX: canvas.getContext("2d"),
      POINTRADIUS: 5,
      INITIALCOLOR: '#000',
      VISITEDCOLOR: '#F00',
      ANIMTIME: 1000
    };
  }
}
