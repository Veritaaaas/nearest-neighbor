const nearestNeighborTsp = (distanceMatrix) => {
  if (distanceMatrix.length === 0) return [];

  // set the numbers of cities
  const n = distanceMatrix.length;

  // create a visited array and initialize all entries as false
  const visited = new Array(n).fill(false);

  // mark the starting node as visited
  const path = [0];
  visited[0] = true;

  // find the nearest city for the last city added to the path
  for (let _ = 1; _ < n; _++) {
    // get the last city added to the path
    const last = path[path.length - 1];
    let nextCity = null;
    let minDist = Infinity;

    // find the nearest city
    for (let i = 0; i < n; i++) {
      if (!visited[i] && distanceMatrix[last][i] < minDist) {
        minDist = distanceMatrix[last][i];
        nextCity = i;
      }
    }

    // add the nearest city to the path
    path.push(nextCity);
    visited[nextCity] = true;
  }

  path.push(0);

  return path;
};

export default nearestNeighborTsp;