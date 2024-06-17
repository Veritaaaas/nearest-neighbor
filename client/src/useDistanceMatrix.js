let matrix = [
  [0, 100, 150, 300],
  [100, 0, 200, 250],
  [150, 200, 0, 400],
  [300, 250, 400, 0]
]

let weights = [1, 50, 75, 100]



function calculateScore(matrix, weights) {

  let score_matrix = Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      score_matrix[i][j] = 1 - ((0.7 * 1/matrix[i][j]) + 0.3 * weights[j]);
    }
  }

  return score_matrix;
}

let score_matrix = calculateScore(matrix, weights);
console.log(score_matrix)