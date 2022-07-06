class Spot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbours = [];
    this.visited = false;
    this.walls = [true, true, true, true];
  }

  addNeighbours(grid) {
    if (this.x < cols-1) this.neighbours.push(grid[this.x+1][this.y]);
    if (this.x > 0) this.neighbours.push(grid[this.x-1][this.y]);
    if (this.y < rows-1) this.neighbours.push(grid[this.x][this.y+1]);
    if (this.y > 0) this.neighbours.push(grid[this.x][this.y-1]);
    // if (this.x < cols-1 && this.y > 0) this.neighbours.push(grid[this.x+1][this.y-1]);
    // if (this.x > 0 && this.y < rows-1) this.neighbours.push(grid[this.x-1][this.y+1]);
    // if (this.y < rows-1 && this.x < cols-1) this.neighbours.push(grid[this.x+1][this.y+1]);
    // if (this.y > 0 && this.x > 0) this.neighbours.push(grid[this.x-1][this.y-1]);
  }

  canMove(neighbour) {
    if (this.x < neighbour.x) {
      return this.walls[1] == false;
    } else if (this.x > neighbour.x) {
      return this.walls[3] == false;
    } else if (this.y < neighbour.y) {
      return this.walls[2] == false;
    } else if (this.y > neighbour.y) {
      return this.walls[0] == false;
    }
  }

  show(color) {
    let x = this.x*w;
    let y = this.y*h;
    if (this.walls[0]) line(x, y, x+w, y);
    if (this.walls[1]) line(x+w, y, x+w, y+h);
    if (this.walls[2]) line(x, y+h, x+w, y+h);
    if (this.walls[3]) line(x, y, x, y+h);

    if (color) rect(this.x*w, this.y*h, w, h, color);
  }
}