(function(document) {

  var search, connectionPointFrom = null, points = {};

  const POINTRADIUS = 5;
  const canvas = document.querySelector("#path canvas");

  document.querySelector("#tracePath").addEventListener('click', runSearch);
  canvas.addEventListener('click', addPoint);
  canvas.addEventListener('mousemove', setConnection);

  function addPoint(e){
    const x = e.offsetX, y = e.offsetY;
    const numberOfPoints = Object.keys(points).length;
    const point = new Point({
      "x" : x,
      "y" : y,
      "pointID" : "p" + numberOfPoints,
      "isEnd" : true,
      "connections": []
    });

    if(numberOfPoints == 0){
      point.isBegin = 1;
    }else{
      const previousPoint = numberOfPoints - 1;
      points["p" + previousPoint].isEnd = undefined;
    }

    points[point.pointID] = point;

    point.draw();
  }

  function setConnection(e){
    if(!connectionPointFrom){
      setConnectionPointFrom(e);
      return;
    }

    const x = e.offsetX, y = e.offsetY;
    const connectionPointTo = getPointFromCoordinates({
      "x" : x,
      "y" : y
    });

    if(connectionPointTo){

      //Make sure that hovering beggining point doesn't make a connection to itself.
      if(connectionPointTo.pointID == connectionPointFrom.pointID){
        return;
      }

      if(!connectionPointFrom.connectsWith(connectionPointTo)){
        connectionPointFrom.connect(connectionPointTo);
        connectionPointFrom.drawConnection(connectionPointTo);
        connectionPointFrom = null;
        setNewEnd(connectionPointTo);
      }

    }
  }

  function setConnectionPointFrom(e){
    const x = e.offsetX, y = e.offsetY;
    connectionPointFrom = getPointFromCoordinates({
      "x" : x,
      "y" : y
    });

    //Makes sure the beginning point of this connection isn't the last point added.
    if(connectionPointFrom && connectionPointFrom.isEnd){
      connectionPointFrom = null;
    }
  }

  function setNewEnd(connectionPointTo){
    for(var pointIndex in points){
      var point = points[pointIndex];
      if(point.pointID != connectionPointTo.pointID){
        delete point.isEnd;
      }else{
        point.isEnd = true;
      }
    }
  }

  function getPointFromCoordinates(p){
    for(var pointIndex in points){
      var point = points[pointIndex];
      if(point.distance(p) <= POINTRADIUS){
        return point;
      }
    }
    return null;
  }

  function runSearch(){
    if(search && search.timeOutIsRunning){
      alert("Wait current search to finish.");
      return;
    }

    search = new AStarSearch();
    search.setPoints(points);
    const nodes = search.search();
    search.animateNodesDraw(search.endNode);

    //@Gambiarra Points is passed as reference, so I need to unset this so the
    //count of points don't mess up.
    delete points.begin;
    delete points.end;
  }
})(document);
