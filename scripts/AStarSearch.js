class AStarSearch{

  constructor() {
    this.animationInterval = CanvasUtils.CANVASCONSTS.ANIMTIME;
    CanvasUtils.clearCanvas();
  }

  getPoints (){
    return this.points;
  }

  setPoints (points) {
    this.points = points;
    this.processPoints();
    this.drawPoints();
  }

  processPoints () {
    for (var pointID in this.points) {
      const point = this.points[pointID];

      var pointConnections = point.getConnections();
      if(Object.keys(pointConnections).length > 0){
        var connections = [];
        for (var connectionPointID in pointConnections){
            connections[connectionPointID] = point.distance(this.points[connectionPointID]);
        }
        point.connections = connections;
      }

      if ("isBegin" in point){
        this.points.begin = point;
        this.points.begin.pointID = pointID;
      }else{
        if ("isEnd" in point){
          this.points.end = point;
          this.points.end.pointID = pointID;
        }
      }
    }
  }

  drawPoints (){

    this.initPathDraw(CanvasUtils.CANVASCONSTS.INITIALCOLOR);

    for (var pointID in this.points){
      const point = this.points[pointID];
      point.draw();
      point.drawConnections(this.points);
    }
  }

  drawPathFromNode (node){

    this.initPathDraw(CanvasUtils.CANVASCONSTS.VISITEDCOLOR);

    while(node){
      node.point.draw();
      if(node.parent){
        node.point.drawConnection(node.parent.point);
      }
      node = node.parent;
    }
  }

  initPathDraw (color){
    CanvasUtils.CANVASCONSTS.CTX.beginPath();

    CanvasUtils.CANVASCONSTS.CTX.fillStyle = color;
    CanvasUtils.CANVASCONSTS.CTX.strokeStyle = color;
  }

  animateNodesDraw (node){
    this.queueTimeOut([
      this.drawPoints.bind(this),
      this.drawPathFromNode.bind(this, node)
    ]);

  }

  queueTimeOut (functions){
    for(var functionIndex in functions){
      setTimeout(functions[functionIndex], this.animationInterval);
    }
    this.animationInterval += CanvasUtils.CANVASCONSTS.ANIMTIME;
  }

  setTimeOutIsRunning (isRunning){
    this.timeOutIsRunning = isRunning;
  }

  paint (){
    CanvasUtils.CANVASCONSTS.CTX.stroke();
    CanvasUtils.CANVASCONSTS.CTX.fill();
  }

  search () {
    const begin = this.points.begin;
    const end = this.points.end;
    var currentPoint = begin;
    var currentPointID = begin.pointID;
    var fronteer = [], nodes = [], visited = [];

    fronteer.push({
      "pointID": begin.pointID,
      "point": begin,
      "parent": null,
      "action": "",
      "cost": 0
    });
    var currentNodeID = 0;
    var currentNode = fronteer[currentNodeID];

    this.setTimeOutIsRunning(true);
    this.animateNodesDraw(currentNode);

    nodes[begin.pointID] = [];
    nodes[begin.pointID][begin.pointID] = currentNode;

    visited[begin.pointID] = true;

    this.setPoinstDistanceToEnd();

    var maximumIterations = 100;
    while(!(end.pointID in visited) && fronteer.length > 0 && maximumIterations > 0){
      maximumIterations--;

      const connections = currentPoint.getConnections();
      for(var connectionPointID in connections){
        const distance = connections[connectionPointID];
        const node = {
          "pointID": connectionPointID,
          "point": this.points[connectionPointID],
          "parent": currentNode,
          "cost": currentNode.cost + distance,
          "action": currentNode.action + "->" +connectionPointID
        };

        fronteer.push(node);

        if(!(connectionPointID in nodes)){
          nodes[connectionPointID] = [];
        }
        nodes[connectionPointID][node.action] = node;
      }

      fronteer.splice(currentNodeID,1);
      var minimumDistance = Infinity;
      for(var nodeID in fronteer){
        const node = fronteer[nodeID];
        const distance = node.cost + node.point.distanceToEnd;
        if(distance < minimumDistance){
          minimumDistance = distance;
          currentNode = node;
          currentNodeID = nodeID;
          currentPoint = node.point;
          currentPointID = node.pointID;
        }
      }
      visited[currentPointID] = true;
      this.animateNodesDraw(currentNode);
    }

    setTimeout(this.setTimeOutIsRunning.bind(this, false), this.animationInterval);

    var minimumCost = Infinity;
    var endNode;
    for(var action in nodes[end.pointID]){
      var node = nodes[end.pointID][action];
      if(node.cost < minimumCost){
        minimumCost = node.cost;
        endNode = node;
      }
    }

    this.endNode = endNode;

    var path = [];
    currentNode = endNode;

    while(currentNode){
      path.push(currentNode);
      currentNode = currentNode.parent;
    }

    return path;
  }

  setPoinstDistanceToEnd (){
    for(var pointID in this.points){
      var point = this.points[pointID];
      point.distanceToEnd = point.distance(this.points.end);
    }
  }

}
