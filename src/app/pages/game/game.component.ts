import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.player = 'player1';
  }

  checkSquare(event) {
    const id: string = event.target.id;
    const xAxes = id[0];
    const yAxes = id[1];
    if (this.board[xAxes][yAxes] === '-') {
      this.board[xAxes][yAxes] = this.player === 'player1' ? 'x' : 'o';
      this.changeCurrentPlayer();
    }
    console.log(this.board)
  }


  changeCurrentPlayer() {
    this.player = this.player === 'player1' ? 'player2' : 'player1';
    console.log(this.player);
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
    if (!player1Wins && !player2Wins) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        for (let colIndex = 0; colIndex < 3; colIndex++) {
          if (gameUnfinished) { break; }
          if (this.board[rowIndex][colIndex] === '-') {
            gameUnfinished = true;
            break;
          }
        }
      }
    }
    if (player1Wins || player2Wins || !gameUnfinished) {
      this.text = player1Wins ? 'Player 1 Wins' : 'Player 2 Wins';
      if (!gameUnfinished) { this.text = 'It\'s a Draw'; }
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

}
