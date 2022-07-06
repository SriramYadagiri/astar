function recursiveBacktracker(start) {
  start.visited = true;
  let unvisitedNeighbours = start.neighbours.filter(n => !n.visited);
  while (unvisitedNeighbours.length > 0) {
    let chosen = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];
    chosen.visited = true;
    carve(start, chosen);
    recursiveBacktracker(chosen);
    unvisitedNeighbours = start.neighbours.filter(n => !n.visited)
  }
}

function carve(a, b) {
  if (a.x < b.x) {
    a.walls[1] = false;
    b.walls[3] = false;
  } else if (a.x > b.x) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (a.y < b.y) {
    a.walls[2] = false;
    b.walls[0] = false;
  } else if (a.y > b.y) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
}