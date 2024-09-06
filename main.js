function knightMoves(start, target) {
  // Helper function to check if the position is within the board bounds
  function isInBounds([x, y]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  // Possible knight moves: 2 squares in one direction and 1 in the other
  const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  // If the starting position is the same as the target, return immediately
  if (start[0] === target[0] && start[1] === target[1]) {
    return [start];
  }

  // Queue for BFS where we store positions and paths
  const queue = [[start, [start]]];
  const visited = new Set([start.toString()]);

  // BFS
  while (queue.length > 0) {
    const [currentPos, path] = queue.shift();
    const [x, y] = currentPos;

    // Explore all possible knight moves
    for (const [dx, dy] of moves) {
      const nextPos = [x + dx, y + dy];

      if (isInBounds(nextPos) && !visited.has(nextPos.toString())) {
        const newPath = [...path, nextPos];
        // Check if we reached the target
        if (nextPos[0] === target[0] && nextPos[1] === target[1]) {
          console.log(
            `You made it in ${newPath.length - 1} moves! Here's your path:`
          );
          return newPath;
        }
        // Mark the square as visited and add it to the queue
        visited.add(nextPos.toString());
        queue.push([nextPos, newPath]);
      }
    }
  }

  return null; // If no path found (should not happen on a valid board)
}

// Example usage:
console.log(knightMoves([0, 0], [1, 2])); // Output: [[0, 0], [1, 2]]
console.log(knightMoves([0, 0], [3, 3])); // Output could be: [[0,0], [1,2], [3,3]] or similar
console.log(knightMoves([3, 3], [0, 0])); // Output could be: [[3,3], [1,2], [0,0]] or similar
console.log(knightMoves([0, 0], [7, 7])); // Outputs the shortest path from [0,0] to [7,7]
console.log(knightMoves([3, 3], [4, 3]));
