const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cols = 25;
const rows = 25;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let path = [];

setup();
draw();

function setup() {
  grid = new Array(cols);
  
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  w = canvas.width / cols;
  h = canvas.height / rows;

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  openSet = [];
  closedSet = [];
  path = [];

  recursiveBacktracker(start, end);

  openSet.push(start);
}

function draw() {
  let animateID = requestAnimationFrame(draw);
  if (openSet.length > 0) {
    let lowestInd = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestInd].f) {
        lowestInd = i;
      }
    }

    var current = openSet[lowestInd];


    if (current == end) {
      cancelAnimationFrame(animateID);
      path = [current];
      var temp = current;
      while(temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log("done");
    } else {
      openSet.splice(lowestInd, 1);
      closedSet.push(current);

      let neighbours = current.neighbours;
      for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
        if (!closedSet.includes(neighbour) && current.canMove(neighbour)){
          let temp_g = current.g + 1;

          if (openSet.includes(neighbour)) {
            if (temp_g < neighbour.g) {
              neighbour.g = temp_g;
              neighbour.parent = current;
            }
          } else {
            neighbour.g = temp_g;
            openSet.push(neighbour);
            neighbour.parent = current;
          }

          neighbour.h = heuristic(neighbour, end)
          neighbour.f = neighbour.g + neighbour.h;
        }
      }
    }
    
  } else {
    cancelAnimationFrame(animateID);
    console.log("No Solution");
    return;
  }

  path = [current];
  var temp = current;
  while(temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  // for (let i = 0; i < openSet.length; i++) {
  //   openSet[i].show("green");
  // }

  // for (let i = 0; i < closedSet.length; i++) {
  //   closedSet[i].show("red");
  // }

  start.show("rgba(0, 255, 0, 0.5)");
  end.show("rgba(255, 0, 0, 0.5)");

  ctx.beginPath();
  ctx.strokeStyle = "skyblue";
  ctx.lineWidth = w/2.5;
  ctx.moveTo(path[path.length-1].x*w+w/2, path[path.length-1].y*h+h/2);

  for (let i = path.length-1; i >= 0; i--) {
    if (path[i].parent) {
      ctx.lineTo(path[i].x*w+w/2, path[i].y*h+h/2);
      ctx.stroke();
    }
  }
}

function heuristic(s1, s2) {
  let a = s2.x-s1.x;
  let b = s2.y-s1.y;
  // return Math.sqrt(a*a + b*b);
  return Math.abs(a) + Math.abs(b);
  // dx = Math.abs(s1.x - s2.x)
  // dy = Math.abs(s1.y - s2.y)
  // return (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy);
}

function rect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function circle(x, y, rad, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, rad, 0, 2 * Math.PI);
  ctx.fill();
}

function line(x1, y1, x2, y2, color="black", lw=1) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = lw;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}