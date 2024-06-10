const swap = (path, i, j) => {
  const newPath = [...path];
  while (i < j) {
    [newPath[i], newPath[j]] = [newPath[j], newPath[i]];
    i++;
    j--;
  }
  return newPath;
};

const totalDistance = (path, distanceMatrix) => {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    total += distanceMatrix[path[i]][path[i + 1]];
  }
  return total;
};

const twoOpt = (path, distanceMatrix) => {
  let improvement = true;
  while (improvement) {
    improvement = false;
    for (let i = 0; i < path.length - 1; i++) {
      for (let j = i + 1; j < path.length; j++) {
        const newPath = swap(path, i, j);
        if (totalDistance(newPath, distanceMatrix) < totalDistance(path, distanceMatrix)) {
          path = newPath;
          improvement = true;
        }
      }
    }
  }
  return path;
};

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

  path.push(0);

  return twoOpt(path, distanceMatrix);
};

export default nearestNeighborTsp;