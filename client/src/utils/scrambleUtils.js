import { MOVES, SCRAMBLE_LENGTH } from "../data/scrambleData";
const getRandomMove = () => MOVES[Math.floor(Math.random() * MOVES.length)];

export const generateScramble = () => {
  const badMoves = new Set();

  const scramble = Array.from({ length: SCRAMBLE_LENGTH }, () => {
    let move;
    do {
      move = getRandomMove();
    } while (!updateBadMovesAndGetResult(move, badMoves));

    return move;
  }).join(" ");

  return scramble;
};

function updateBadMovesAndGetResult(move, badMoves) {
  const newBadMoves = [];
  // there cannot be the same rotation twice in a row
  // there also cannot be a move that was done before and its side was not effect. exp : R L R2
  if (badMoves.has(move.charAt(0))) return false;

  newBadMoves.push(move.charAt(0));
  // we need to remove the bad moves once they have become ok again.
  switch (move.charAt(0)) {
    case "R":
      if (badMoves.has("L")) newBadMoves.push("L");
      break;

    case "L":
      if (badMoves.has("R")) newBadMoves.push("R");
      break;
    case "U":
      if (badMoves.has("D")) newBadMoves.push("D");
      break;
    case "D":
      if (badMoves.has("U")) newBadMoves.push("U");
      break;
    case "F":
      if (badMoves.has("B")) newBadMoves.push("B");
      break;
    case "B":
      if (badMoves.has("F")) newBadMoves.push("F");
      break;
  }

  badMoves.clear();
  newBadMoves.forEach(badMoves.add, badMoves);
  return true;
}
