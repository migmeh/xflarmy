import { Component, OnInit } from '@angular/core';
import * as ChessBoard from 'chessboardjs/www/js/chessboard';
declare var $: any;


@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {





  constructor() { }
  title = 'frontend';
  board1: ChessBoard;
  ngOnInit(): void {
    var config = {
      draggable: true,
      dropOffBoard: 'snapback', // this is the default
      position: 'start'
    }
    this.board1 = ChessBoard('chessboard', config);



}
}
