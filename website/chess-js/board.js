export class Board {
  constructor(board, pieces) {
    this.board = board;
    this.pieces = pieces;
    this.resetBoard();
  }
  dots = [];
  selectedNode = null;
  htmlBoard = document.getElementById("board");
  perft() {
    this.board[64] = "1";
    bot.genNewMove(this.board);
    console.log("perft: " + count2);
  }
  resetBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let pos = i * 8 + j;
        const node = this.htmlBoard.children[i].children[j];
        node.classList = "";
        node.onclick = () => {
          this.clickNode(pos);
        };
        if (this.board[pos] == "e") {
          node.innerHTML = ``;
          continue;
        }
        let isWhite = this.pieces.isPieceWhite(this.board[pos]);
        node.innerHTML = `<img src="/website/chess-js/images/${
          this.pieces.toLowerCase(this.board[pos]) + (isWhite ? "w" : "b")
        }.png">`;
      }
    }
    this.dots.forEach((pos) => {
      let y = pos >>> 3;
      this.htmlBoard.children[y].children[pos - y * 8].classList.add("dot");
    });
    if (!this.selectedNode) return;
    let y = this.selectedNode >>> 3;
    this.htmlBoard.children[y].children[
      this.selectedNode - y * 8
    ].classList.add("selected");
  }
  activateChessHandler = null;
  clickNode(node) {
    console.log(node);
    if (this.dots.includes(node)) {
      this.pieces.movePiece(this.selectedNode, node, this.board);
      this.board[64] = this.board[64] == "1" ? "0" : "1";
      const holdSelectedNode = this.selectedNode;
      this.resetSelectedNode(true);
      const ended = this.hasGameEnded();
      if (ended)
        console.log((this.board[64] == "1" ? "Black" : "White") + " has won!");
      else if (ended == null) console.log("Stalemate");
      else {
        this.activateChessHandler = {
          selectedNode: holdSelectedNode,
          node: node,
        };
      }
      this.resetSelectedNode(false);
      return;
    } else if (this.board[node] == "e") {
      this.resetSelectedNode(true);
      return;
    }
    if (
      this.pieces.isPieceWhite(this.board[node]) !==
      (this.board[64] == "1")
    ) {
      this.resetSelectedNode(true);
      return;
    }
    this.dots = this.pieces.getValidMovesForPiece(node, this.board);
    this.selectedNode = node;
    this.resetBoard();
  }
  resetSelectedNode(resetBoard) {
    this.selectedNode = null;
    this.dots = [];
    if (resetBoard) {
      this.resetBoard();
    }
  }
  hasGameEnded() {
    for (let i = 0; i < 64; i++) {
      if (this.pieces.isPieceBlack(this.board[i]) == (this.board[64] == "1"))
        continue;
      //console.log(this.board[i], this.board[64])
      if (this.pieces.getValidMovesForPiece(i, this.board).length !== 0) {
        return false;
      }
    }
    if (this.pieces.isInCheck(this.board[64] == "1", this.board)) return true;
    return null;
  }
}
