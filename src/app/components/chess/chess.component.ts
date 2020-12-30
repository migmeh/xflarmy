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



 setDepth(depth){
  console.log("este es el "+depth);
  document.getElementById('difficulty').style.display = 'none';
  document.getElementById('chessboard').style.display = 'block';
  document.getElementById('restart').style.display = 'block';
  console.log(depth);
  //this.minimaxDepth = depth;
}

  ngOnInit() {
////////////////////////// 7

    //this.minimaxDepth = 2;



    /*$('.restartGame').click(function(){
        this.board.clear();
        this.board.start();
        this.game.reset();
        initGame();
      });*/



    // game = new Chess();
    this.game = new Chess();

    let removeGreySquares = () => {
      $('#chessboard .square-55d63').css('background', '');
    };


    let greySquare = (square) => {
      let squareEl = $('#chessboard .square-' + square);

      let background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
      }

      squareEl.css('background', background);
    };




    // uses the minimax algorithm with alpha beta pruning to caculate the best move
    let calculateBestMove = ()=> {

      let possibleNextMoves = this.game.moves();
      let bestMove = -9999;
      let bestMoveFound;

      for (let i = 0; i < possibleNextMoves.length; i++) {
        let possibleNextMove = possibleNextMoves[i];
        this.game.move(possibleNextMove);
        let value = minimax(1, -10000, 10000, false); //here cambiar el 1 por 2 o 0
        this.game.undo();
        if (value >= bestMove) {
          bestMove = value;
          bestMoveFound = possibleNextMove;
        }
      }
      return bestMoveFound;
    };


    // minimax with alhpha-beta pruning and search depth d = 3 levels
    let minimax = (depth, alpha, beta, isMaximisingPlayer)=>{
      if (depth === 0) {
        return -evaluateBoard(this.game.board());
      }

      let possibleNextMoves = this.game.moves();
      let numPossibleMoves = possibleNextMoves.length;
      let bestMove = -9999;
      if (isMaximisingPlayer) {

        for (let i = 0; i < numPossibleMoves; i++) {
          this.game.move(possibleNextMoves[i]);
          bestMove = Math.max(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
          this.game.undo();
          alpha = Math.max(alpha, bestMove);
          if (beta <= alpha){
            return bestMove;
          }
        }

      } else {
        let bestMove = 9999;
        for (let i = 0; i < numPossibleMoves; i++) {
          this.game.move(possibleNextMoves[i]);
          bestMove = Math.min(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
          this.game.undo();
          beta = Math.min(beta, bestMove);
          if (beta <= alpha){
            return bestMove;
          }
        }
      }

      return bestMove;
    };


    // the evaluation function for minimax
    let evaluateBoard = (board)=> {
      let totalEvaluation = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
        }
      }
      return totalEvaluation;
    };


    let reverseArray = (array)=>{
      return array.slice().reverse();
    };

    let whitePawnEval =
      [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0,  1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
      ];

    let blackPawnEval = reverseArray(whitePawnEval);

    let knightEval =
      [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
      ];

    let whiteBishopEval = [
      [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
      [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
      [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
      [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
      [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
      [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
      [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ];

    let blackBishopEval = reverseArray(whiteBishopEval);

    let whiteRookEval = [
      [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
      [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
    ];

    let blackRookEval = reverseArray(whiteRookEval);

    let evalQueen = [
      [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
      [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
      [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
      [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ];

    let whiteKingEval = [

      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
      [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
      [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
      [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
    ];

    let blackKingEval = reverseArray(whiteKingEval);


    let getPieceValue = (piece, x, y)=>{
      if (piece === null) {
        return 0;
      }

      let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x , y);

      if (piece.color === 'w'){
        return absoluteValue;
      } else {
        return -absoluteValue;
      }
    };


    let getAbsoluteValue = (piece, isWhite, x , y) =>{
      if (piece.type === 'p') {
        return 10 + ( isWhite ? whitePawnEval[y][x] : blackPawnEval[y][x] );
      } else if (piece.type === 'r') {
        return 50 + ( isWhite ? whiteRookEval[y][x] : blackRookEval[y][x] );
      } else if (piece.type === 'n') {
        return 30 + knightEval[y][x];
      } else if (piece.type === 'b') {
        return 30 + ( isWhite ? whiteBishopEval[y][x] : blackBishopEval[y][x] );
      } else if (piece.type === 'q') {
        return 90 + evalQueen[y][x];
      } else if (piece.type === 'k') {
        return 900 + ( isWhite ? whiteKingEval[y][x] : blackKingEval[y][x] );
      }
    };


    let makeAImove = ()=> {
      let bestMove = calculateBestMove();
      this.game.move(bestMove);
      this.board.position(this.game.fen());
    };


    let onDrop = (source, target)=> {
      removeGreySquares();

      // see if the move is legal
      var move = this.game.move({
        from: source,
        to: target,
        promotion: 'q'
      });

      // illegal move
      if (move === null) { return 'snapback'; }

      // make legal move for black AI player
      window.setTimeout(makeAImove, 250);
    };


    var onMouseoverSquare = (square, piece) => {
      // get list of possible moves for this square
      var moves = this.game.moves({
        square: square,
        verbose: true
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) return;

      // highlight the square they moused over
      greySquare(square);

      // highlight the possible squares for this piece
      for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
      }
    };

    let onMouseoutSquare = (square, piece) =>{
      removeGreySquares();
    };


    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    let onSnapEnd = ()=> {
      this.board.position(this.game.fen());
    };


    /* var cfg = {
       draggable: true,
       position: 'start',
       onDragStart: onDragStart,
       onDrop: onDrop,
       onMouseoutSquare: onMouseoutSquare,
       onMouseoverSquare: onMouseoverSquare,
       onSnapEnd: onSnapEnd
     };
     board = ChessBoard('board', cfg);*/


///////////////////////////////
      let config = {
      orientation: 'white',
      draggable: true,
      position: 'start',
      moveSpeed: 'fast',
      snapbackSpeed: 100,
      snapSpeed: 100,
      pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
      showNotation: false,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd,
      onDragStart: this.onDragStart.bind( this )
    };


      this.board = new ChessBoard( 'chessboard', config );

      //this.game = new Chess();

      console.log('color of g5: ' + this.game.square_color('g5'));

     //this.board.move('e2-e4');

      this.updateStatus();

  }


  // do not pick up pieces if the game is over
  // only pick up pieces for White
/*
  var onDragStart = (source, piece, position, orientation) => {
    if (this.game.in_checkmate() === true || this.game.in_draw() === true || this.game.game_over() === true ) {
      $('#gameover').show();
      $("#gameover").html('Game over!');
      return false;
    }
  };
*/



  onDragStart(source, piece, position, orientation) {
    if (this.game.in_checkmate() === true || this.game.in_draw() === true || this.game.game_over() === true ) {
      document.getElementById('gameover').style.display="block";
      $('#gameover').html('checkmate !');
      return false;
    }
    /*// do not pick up pieces if the game is over
    if (this.game.game_over()) {return false};

    // only pick up pieces for the side to move
    if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    };

    return true;*/
  }


  updateStatus() {
    let status = '';

    let moveColor = 'White';
    if (this.game.turn() === 'b') {
      moveColor = 'Black';
    }

    // checkmate?
    if (this.game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (this.game.in_draw()) {
      status = 'Game over, drawn position';
    }

    // game still on
    else {
      status = moveColor + ' to move';

      // check?
      if (this.game.in_check()) {
        status += ', ' + moveColor + ' is in check';
      }
    }

    console.log(status);
  }




/*
 dropOffBoard: 'snapback', // this is the default
      position: 'start'
* */
}
