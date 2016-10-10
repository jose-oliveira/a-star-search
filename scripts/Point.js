class Point{

  constructor (initializer){
    for (var key in initializer){
      this[key] = initializer[key];
    }
  }

 static drawPoints (points){
    CanvasUtils.initPathDraw(CanvasUtils.CANVASCONSTS.INITIALCOLOR);

     for (var pointID in points){
       const point = points[pointID];
       point.draw();
       point.drawConnections(points);
     }
 }

 static drawPointsAndClearCanvas (points){
   CanvasUtils.clearCanvas();
   Point.drawPoints(points);
 }

 draw (){
   CanvasUtils.CANVASCONSTS.CTX.beginPath();
   CanvasUtils.CANVASCONSTS.CTX.arc(this.x, this.y, CanvasUtils.CANVASCONSTS.POINTRADIUS, 0, 2 * Math.PI);
   CanvasUtils.CANVASCONSTS.CTX.fill();
   CanvasUtils.CANVASCONSTS.CTX.stroke();
 }

 drawConnection (p){
   CanvasUtils.CANVASCONSTS.CTX.beginPath();
   CanvasUtils.CANVASCONSTS.CTX.moveTo(this.x, this.y);
   CanvasUtils.CANVASCONSTS.CTX.lineTo(p.x, p.y);
   CanvasUtils.CANVASCONSTS.CTX.stroke();
 }

 drawConnections (points){
   const connections = this.getConnections();
   for (var connectionPointID in connections){
     const connection = points[connectionPointID];
     this.drawConnection(connection);
   }
 }

 distance (p){
   return Math.sqrt(Math.pow(Math.abs(this.x - p.x), 2) + Math.pow(Math.abs(this.y - p.y), 2));
 }

 connectsWith (p){
   return this.connections[p.pointID];
 }

 connect(p){
   this.connections[p.pointID] = p.pointID;
 }

 getConnections () {
   if("connections" in this){
     return this.connections;
   }
   return [];
 }

}
