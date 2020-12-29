import { Component, OnInit } from '@angular/core';
import * as ChessBoard from 'chessboardjs/www/js/chessboard';
declare var $: any;

declare var ChessBoard: any;
declare var Chess: any;
@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {
  board: any;
  game: any;

  constructor() { }


  ngOnInit() {
    var config = {
      orientation: 'white',
      draggable: true,
      position: 'start',
      moveSpeed: 'fast',
      snapbackSpeed: 100,
      snapSpeed: 100,
      pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
      showNotation: false,
      onDragStart: this.onDragStart.bind( this )
    }


    this.board = new ChessBoard( 'chessboard', config )

    this.game = new Chess();

    console.log('color of g5: ' + this.game.square_color('g5'));

    this.board.move('e2-e4');

    this.updateStatus();

  }


  onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (this.game.game_over()) {return false};

    // only pick up pieces for the side to move
    if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    };
    return true;
  }


  updateStatus () {
    var status = ''

    var moveColor = 'White'
    if (this.game.turn() === 'b') {
      moveColor = 'Black'
    }

    // checkmate?
    if (this.game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }

    // draw?
    else if (this.game.in_draw()) {
      status = 'Game over, drawn position'
    }

    // game still on
    else {
      status = moveColor + ' to move'

      // check?
      if (this.game.in_check()) {
        status += ', ' + moveColor + ' is in check'
      }
    }

    console.log(status);
  }




/*
 dropOffBoard: 'snapback', // this is the default
      position: 'start'
* */
}
