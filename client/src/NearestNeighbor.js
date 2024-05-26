// src/NearestNeighbor.js
const nearestNeighborTsp = (distanceMatrix) => {
    if (distanceMatrix.length === 0) return [];
  
    const n = distanceMatrix.length;
    const visited = new Array(n).fill(false);
    const path = [0];
    visited[0] = true;
  
    for (let _ = 1; _ < n; _++) {
      const last = path[path.length - 1];
      let nextCity = null;
      let minDist = Infinity;
  
      for (let i = 0; i < n; i++) {
        if (!visited[i] && distanceMatrix[last][i] < minDist) {
          minDist = distanceMatrix[last][i];
          nextCity = i;
        }
      }
  
      path.push(nextCity);
      visited[nextCity] = true;
    }
  
    path.push(0);  // Return to the starting point
    return path;
  };
  
  export default nearestNeighborTsp;
  