class Filter{
  constructor(name){
    switch (name) {
      case 'sobel':
        this.horizontal = [[1,2,1],[0,0,0],[-1,-2,-1]];
        this.vertical = [[1,0,-1],[2,0,-2],[1,0,-1]];
      break;
      case 'prewitt':
        this.horizontal = [[1,1,1],[0,0,0],[-1,-1,-1]];
        this.vertical = [[1,0,-1],[1,0,-1],[1,0,-1]];
      break;
      case 'kirsh':
        this.horizontal = [[5,5,5],[-3,0,-3],[-3,-3,-3]];
        this.vertical = [[5,-3,-3],[5,0,-3],[5,-3,-3]];
      break;
      default:
        this.horizontal = [[-1],[1]];
        this.vertical = [[-1,1]];
      break;
    }
  }
}
