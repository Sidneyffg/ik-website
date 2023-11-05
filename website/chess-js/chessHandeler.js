import { Board } from "/website/chess-js/board.js";
import { Pieces } from "/website/chess-js/pieces.js";

const pieces = new Pieces();

const boardBoard = [
  "r",
  "n",
  "b",
  "q",
  "k",
  "b",
  "n",
  "r",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "R",
  "N",
  "B",
  "Q",
  "K",
  "B",
  "N",
  "R",
  "1",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
];
const stdBoard = new Board(boardBoard, pieces);

setInterval(() => {
  console.log(stdBoard.activateChessHandler);
  if (!stdBoard.activateChessHandler) return;
  const strMove =
    chessHandler.intPosToStrPos(stdBoard.activateChessHandler.selectedNode) +
    chessHandler.intPosToStrPos(stdBoard.activateChessHandler.node);
  stdBoard.activateChessHandler = null;
  chessHandler.addMove(strMove);
  chessHandler.playBotMove();
}, 100);

class ChessHandler {
  movesStr = "";
  addMove(move) {
    this.movesStr += " " + move;
  }
  async playBotMove() {
    fetch(`${serverAddr}?data=${this.movesStr}`)
      .then((data) => data.json())
      .then((data) => {
        const move = data.move;
        console.log(move);
        this.addMove(move);
        pieces.movePiece(
          this.strPosToIntPos(move.substring(0, 2)),
          this.strPosToIntPos(move.substring(2, 4)),
          stdBoard.board
        );
        stdBoard.board[64] = stdBoard.board[64] == "1" ? "0" : "1";
        stdBoard.resetBoard();
      });
  }
  strPosToIntPos(strPos) {
    return (
      this.#strToInt.indexOf(strPos.charAt(0)) +
      Math.abs(parseInt(strPos.charAt(1)) - 8) * 8
    );
  }
  intPosToStrPos(intPos) {
    const row = intPos >>> 3;
    return (
      this.#strToInt.charAt(intPos - row * 8) + Math.abs(row - 8).toString()
    );
  }
  #strToInt = "abcdefgh";
}
const chessHandler = new ChessHandler();

const serverAddr = "http://95.99.209.173:3000/getMove";
