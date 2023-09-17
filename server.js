const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process'); // Fixed the require statement
const app = express();
const chess_bot = spawn(__dirname + "/chess_bot.exe");
let lastBotMove = null; // Use "let" instead of "const" for lastBotMove

app.use(cors());

app.get("/getMove", async (req, res) => {
  console.log("Received request for move");
  console.log(req.query.data)
  const move = await getMove(req.query.data);
  console.log("Sending move:", move);
  res.send({ move: move });
});

app.listen(3000, () => {
  console.log('Listening on *:3000');
});

async function getMove(moves) {
  console.log(`Sending command: position startpos moves${moves}\ngo btime 20000\n`)
  chess_bot.stdin.write(`position startpos moves${moves}\ngo btime 20000\n`);
  while (!lastBotMove) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Add a small delay to avoid busy-waiting
  }
  const saveReturn = lastBotMove;
  lastBotMove = null;
  return saveReturn;
}

// Initialize the chess engine
chess_bot.stdin.write("uci\n");

chess_bot.stdout.on("data", data => {
  const bestMoveStr = data.toString().split("\n").find(e => e.includes("bestmove"));
  if (!bestMoveStr) return;
  const bestMove = bestMoveStr.split(" ")[1];
  console.log("Received best move:", bestMove);
  lastBotMove = bestMove;
});