import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ];
  player: string;
  horizontalLine0: boolean;
  horizontalLine1: boolean;
  horizontalLine2: boolean;
  verticalLine0: boolean;
  verticalLine1: boolean;
  verticalLine2: boolean;
  obliqueLine0: boolean;
  obliqueLine1: boolean;
  closeResult: string;
  text: string;
  bestMoveForPlayer1 = -1;
  bestMoveForPlayer2 = -1;
  chosenAlgorithm: string;
  winner = -1;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.player = 'player1';
    this.chosenAlgorithm = 'Choose Algorithm';
  }

  chooseAlgorithm(event) {
    this.chosenAlgorithm = event.target.id;
  }

  checkSquare(event) {
    const id: string = event.target.id;
    const xAxes = id[0];
    const yAxes = id[1];
    if (this.board[xAxes][yAxes] === '-') {
      this.board[xAxes][yAxes] = this.player === 'player1' ? 'x' : 'o';
      this.changeCurrentPlayer();
    }
  }

  check(event) {
    this.showLine(event);
    this.checkIfPlayerWinsOrDraw();
    if (this.chosenAlgorithm === 'minimax') {
      this.minmaxAlgo();
    } else if (this.chosenAlgorithm === 'alphabeta') {
      this.alphaBetaAlgo();
    }
  }

  changeCurrentPlayer() {
    this.player = this.player === 'player1' ? 'player2' : 'player1';
  }

  checkIfPlayerWinsOrDraw() {
    const player1Wins: boolean = (
      this.board[0][0] === 'x'
      && this.board[0][1] === 'x'
      && this.board[0][2] === 'x'
    )
      || (
        this.board[1][0] === 'x'
        && this.board[1][1] === 'x'
        && this.board[1][2] === 'x'
      )
      || (
        this.board[2][0] === 'x'
        && this.board[2][1] === 'x'
        && this.board[2][2] === 'x'
      )
      || (
        this.board[0][0] === 'x'
        && this.board[1][0] === 'x'
        && this.board[2][0] === 'x'
      ) || (
        this.board[0][1] === 'x'
        && this.board[1][1] === 'x'
        && this.board[2][1] === 'x'
      ) || (
        this.board[0][2] === 'x'
        && this.board[1][2] === 'x'
        && this.board[2][2] === 'x'
      ) || (
        this.board[0][0] === 'x'
        && this.board[1][1] === 'x'
        && this.board[2][2] === 'x'
      ) || (
        this.board[0][2] === 'x'
        && this.board[1][1] === 'x'
        && this.board[2][0] === 'x'
      );
    const player2Wins: boolean = (
      this.board[0][0] === 'o'
      && this.board[0][1] === 'o'
      && this.board[0][2] === 'o'
    )
      || (
        this.board[1][0] === 'o'
        && this.board[1][1] === 'o'
        && this.board[1][2] === 'o'
      )
      || (
        this.board[2][0] === 'o'
        && this.board[2][1] === 'o'
        && this.board[2][2] === 'o'
      )
      || (
        this.board[0][0] === 'o'
        && this.board[1][0] === 'o'
        && this.board[2][0] === 'o'
      ) || (
        this.board[0][1] === 'o'
        && this.board[1][1] === 'o'
        && this.board[2][1] === 'o'
      ) || (
        this.board[0][2] === 'o'
        && this.board[1][2] === 'o'
        && this.board[2][2] === 'o'
      ) || (
        this.board[0][0] === 'o'
        && this.board[1][1] === 'o'
        && this.board[2][2] === 'o'
      ) || (
        this.board[0][2] === 'o'
        && this.board[1][1] === 'o'
        && this.board[2][0] === 'o'
      );
    let gameUnfinished = false;
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        if (gameUnfinished) { break; }
        if (this.board[rowIndex][colIndex] === '-') {
          gameUnfinished = true;
          break;
        }
      }
    }
    if (player1Wins || player2Wins || !gameUnfinished) {
      this.winner = player1Wins ? 1 : player2Wins ? 2 : 0
      this.text = player1Wins ? 'Player 1 Wins' : 'Player 2 Wins';
      if (!gameUnfinished && !player1Wins && !player2Wins) { this.text = 'It\'s a Draw'; }
      setTimeout(() => { document.getElementById('openModalButton').click(); }, 1000);
    }
  }

  reload() {
    location.reload();
  }

  goToMenu() {

  }

  showLine(event) {
    const horizontalLine0 = (
      this.board[0][0] === 'o'
      && this.board[0][1] === 'o'
      && this.board[0][2] === 'o'
    )
      || (
        this.board[0][0] === 'x'
        && this.board[0][1] === 'x'
        && this.board[0][2] === 'x'
      );
    this.horizontalLine0 = horizontalLine0;
    const horizontalLine1 = (
      this.board[1][0] === 'o'
      && this.board[1][1] === 'o'
      && this.board[1][2] === 'o'
    )
      || (
        this.board[1][0] === 'x'
        && this.board[1][1] === 'x'
        && this.board[1][2] === 'x'
      );
    this.horizontalLine1 = horizontalLine1;
    const horizontalLine2 = (
      this.board[2][0] === 'o'
      && this.board[2][1] === 'o'
      && this.board[2][2] === 'o'
    )
      || (
        this.board[2][0] === 'x'
        && this.board[2][1] === 'x'
        && this.board[2][2] === 'x'
      );
    this.horizontalLine2 = horizontalLine2;
    const verticalLine0 = (
      this.board[0][0] === 'o'
      && this.board[1][0] === 'o'
      && this.board[2][0] === 'o'
    )
      || (
        this.board[0][0] === 'x'
        && this.board[1][0] === 'x'
        && this.board[2][0] === 'x'
      );
    this.verticalLine0 = verticalLine0;
    const verticalLine1 = (
      this.board[0][1] === 'o'
      && this.board[1][1] === 'o'
      && this.board[2][1] === 'o'
    )
      || (
        this.board[0][1] === 'x'
        && this.board[1][1] === 'x'
        && this.board[2][1] === 'x'
      );
    this.verticalLine1 = verticalLine1;
    const verticalLine2 = (
      this.board[0][2] === 'o'
      && this.board[1][2] === 'o'
      && this.board[2][2] === 'o'
    )
      || (
        this.board[0][2] === 'x'
        && this.board[1][2] === 'x'
        && this.board[2][2] === 'x'
      );
    this.verticalLine2 = verticalLine2;
    const obliqueLine0 = (
      this.board[0][0] === 'o'
      && this.board[1][1] === 'o'
      && this.board[2][2] === 'o'
    )
      || (
        this.board[0][0] === 'x'
        && this.board[1][1] === 'x'
        && this.board[2][2] === 'x'
      );
    this.obliqueLine0 = obliqueLine0;
    const obliqueLine1 = (
      this.board[0][2] === 'o'
      && this.board[1][1] === 'o'
      && this.board[2][0] === 'o'
    )
      || (
        this.board[0][2] === 'x'
        && this.board[1][1] === 'x'
        && this.board[2][0] === 'x'
      );
    this.obliqueLine1 = obliqueLine1;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
  }

  createBoard() {
    const newBoard = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        if (this.board[rowIndex][colIndex] === '-') {
          if (rowIndex === 0) {
            newBoard[rowIndex + colIndex] = 0;
          }
          if (rowIndex === 1) {
            newBoard[rowIndex + colIndex + 2] = 0;
          }
          if (rowIndex === 2) {
            newBoard[rowIndex + colIndex + 4] = 0;
          }
        } else if (this.board[rowIndex][colIndex] === 'x') {
          if (rowIndex === 0) {
            newBoard[rowIndex + colIndex] = 1;
          }
          if (rowIndex === 1) {
            newBoard[rowIndex + colIndex + 2] = 1;
          }
          if (rowIndex === 2) {
            newBoard[rowIndex + colIndex + 4] = 1;
          }
        } else if (this.board[rowIndex][colIndex] === 'o') {
          if (rowIndex === 0) {
            newBoard[rowIndex + colIndex] = -1;
          }
          if (rowIndex === 1) {
            newBoard[rowIndex + colIndex + 2] = -1;
          }
          if (rowIndex === 2) {
            newBoard[rowIndex + colIndex + 4] = -1;
          }
        }
      }
    }
    return newBoard;
  }

  win(board: number[]): number {
    let b = board[1];
    if (board[0] === b && b === board[2] && b !== 0) { return b; }
    b = board[4];
    if (board[3] === b && b === board[5] && b !== 0) { return b; }
    b = board[7];
    if (board[6] === b && b === board[8] && b !== 0) { return b; }
    b = board[3];
    if (board[0] === b && b === board[6] && b !== 0) { return b; }
    b = board[4];
    if (board[1] === b && b === board[7] && b !== 0) { return b; }
    b = board[5];
    if (board[2] === b && b === board[8] && b !== 0) { return b; }
    b = board[4];
    if (board[0] === b && b === board[8] && b !== 0) { return b; }
    if (board[2] === b && b === board[6] && b !== 0) { return b; }
    return 0;
  }

  minmaxAlgo() {
    const newBoard = this.createBoard();
    if (this.player === 'player1') {
      this.bestMoveForPlayer1 = this.minmax(newBoard, 1, true);
    } else {
      this.bestMoveForPlayer2 = this.minmax(newBoard, -1, true);
    }
  }

  alphaBetaAlgo() {
    const board = this.createBoard();
    if (this.player === 'player1') {
      this.bestMoveForPlayer1 = this.alphaBeta(board, 1, true, -1000, 1000);
    } else {
      this.bestMoveForPlayer2 = this.alphaBeta(board, -1, true, -1000, 1000);
    }
  }

  minmax(board, currentPlayer: number, isMax: boolean): number {
    const winner = this.win(board);
    // If Maximizer has won the game return his/her 
    // evaluated score
    // If Minimizer has won the game return his/her 
    // evaluated score 
    if (winner !== 0) {
      if (currentPlayer === -1) {
        return winner;
      } else {
        return -winner;
      }
    }
    // possible moves
    const possibleMoves: number[] = [];
    for (let index = 0; index < 9; index++) {
      if (board[index] === 0) {
        possibleMoves.push(index);
      }
    }
    // If there are no more moves and no winner then 
    // it is a tie 
    if (possibleMoves.length === 0) {
      return 0;
    }
    let bestMove = -1;
    let value = 100;
    // Traverse all cells 
    for (const move of possibleMoves) {
      // Make the move 
      board[move] = currentPlayer;
      // Call minimax recursively and choose 
      // the maximum value 
      const newValue = -this.minmax(board, -currentPlayer, false); // call the MinMax algorithm for the other player
      // Undo the move 
      board[move] = 0;
      if (newValue < value) { //if the new value is better than the current one, the current one becomes the new value
        value = newValue;
        bestMove = move;
      }
    }
    if (isMax) {
      return (bestMove);
    } else {
      return (value);
    }
  }


  alphaBeta(board, currentPlayer: number, isMax: boolean, alpha: number, beta: number): number {
    const winner = this.win(board);
    // If Maximizer has won the game return his/her 
    // evaluated score
    // If Minimizer has won the game return his/her 
    // evaluated score 
    if (winner !== 0) {
      if (currentPlayer === -1) {
        return winner;
      } else {
        return -winner;
      }
    }
    // possible moves
    const possibleMoves: number[] = [];
    for (let index = 0; index < 9; index++) {
      if (board[index] === 0) {
        possibleMoves.push(index);
      }
    }
    // If there are no more moves and no winner then 
    // it is a tie 
    if (possibleMoves.length === 0) {
      return 0;
    }
    let bestMove = -1;
    let value = 100;
    // Traverse all cells 
    for (const move of possibleMoves) {
      // Make the move 
      board[move] = currentPlayer;
      // Call minimax recursively and choose 
      const newValue = -this.alphaBeta(board, -currentPlayer, false, alpha, beta);
      // Undo the move 
      board[move] = 0;
      if (newValue < value) {
        value = newValue;
        bestMove = move;
      }
      if (isMax) {
        alpha = Math.max(alpha, move[0]);
        if (beta <= alpha) { // α-β pruning
          break;
        }
      } else {
        beta = Math.min(beta, move[0]);
        if (beta <= alpha) { // α-β pruning
          break;
        }
      }
    }
    if (isMax) {
      return (bestMove);
    } else {
      return (value);
    }
  }

}
