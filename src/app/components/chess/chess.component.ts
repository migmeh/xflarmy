import { Component, OnInit } from '@angular/core';
import * as ChessBoard from 'chessboardjs/www/js/chessboard';
import {Title, Meta} from '@angular/platform-browser';
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

  //myvariable :any;
  ///////meta
  constructor(private titleService: Title,
              private metaTagService: Meta) {

  }
///////meta

 /* setDepth(depth){
   // console.log('este es el ' + depth);
    document.getElementById('difficulty').style.display = 'none';
    document.getElementById('chessboard').style.display = 'block';
    document.getElementById('restart').style.display = 'block';
   // console.log(depth);
    // this.minimaxDepth = depth;
  }*/

   ngOnInit(){
     this.titleService.setTitle("Chess online"); //titulo

     this.metaTagService.updateTag({ name: 'twitter:image', content: 'https://xflarmy.com/assets/chess/chess.png' });
     this.metaTagService.updateTag({ property: 'og:image', content: 'https://xflarmy.com/assets/chess/chess.png' });

     this.metaTagService.updateTag({ name: 'twitter:title', content: 'Play chess online' });
     this.metaTagService.updateTag({ property: 'og:title', content: 'Play chess online' });

     this.metaTagService.updateTag({ name: 'twitter:description', content: 'Now you can play chess online and find out if you are smarter than AI' });
     this.metaTagService.updateTag({ property: 'og:description', content: 'Now you can play chess online and find out if you are smarter than AI' });
     this.metaTagService.updateTag({ property: 'description', content: 'Now you can play chess online and find out if you are smarter than AI' });

     this.metaTagService.updateTag({ name: 'keywords', content: 'Chess, game' });
     this.metaTagService.updateTag({ name: 'theme-color', content: '#465162' });


////////////////////////// 7


   // this.minimaxDepth = 2;

//// console.log("awa "+this.minimaxDepth);

    /*$('.restartGame').click(function(){
        this.board.clear();
        this.board.start();
        this.game.reset();
        initGame();
      });*/



    // game = new Chess();
    this.game = new Chess();

    const removeGreySquares = () => {
      $('#chessboard .square-55d63').css('background', '');
    };


    const greySquare = (square) => {
      const squareEl = $('#chessboard .square-' + square);

      let background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
      }

      squareEl.css('background', background);
    };




    // uses the minimax algorithm with alpha beta pruning to caculate the best move
    const calculateBestMove = () => {

      if (this.game.in_checkmate() === true || this.game.in_draw() === true || this.game.game_over() === true ) {

        $('#hacke').modal('show');
        return false;
      }

      const possibleNextMoves = this.game.moves();
      let bestMove = -9999;
      let bestMoveFound;
      const minimaxDepth = 0; // cambiar este para los niveles ewe max 2

      for(let i = 0; i < possibleNextMoves.length; i++) {
        const possibleNextMove = possibleNextMoves[i];
        this.game.move(possibleNextMove);
        const value = minimax(minimaxDepth, -10000, 10000, false); // here cambiar el 1 por 2 o 0

        this.game.undo();
        if (value >= bestMove) {
          bestMove = value;
          bestMoveFound = possibleNextMove;
        }
      }
      return bestMoveFound;
    };

    //let depth:number = 0; // cambiar este ewe
    // minimax with alhpha-beta pruning and search depth d = 3 levels

    const minimax = (depth: number = 0, alpha, beta, isMaximisingPlayer: boolean = false) => {
      if (depth === 0) {
        return -evaluateBoard(this.game.board());
       // console.log('mydepyh ' + depth);
      }


      let possibleNextMoves = this.game.moves();
      let numPossibleMoves = possibleNextMoves.length;
      //let bestMove = -9999;
      let bestMove = -9999;

      if (isMaximisingPlayer){

        for (let i = 0; i < numPossibleMoves; i++){
          bestMove = -9999;
        // console.log('uno ' + isMaximisingPlayer);
         this.game.move(possibleNextMoves[i]);
         bestMove = Math.max(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
         this.game.undo();
         alpha = Math.max(alpha, bestMove);
         if (beta <= alpha){
            return bestMove;
          // console.log('unobest ' + bestMove);
          }
        }

      }else{
        for (let i = 0; i < numPossibleMoves; i++){
          bestMove = -9999;
         // console.log('dos ' + isMaximisingPlayer);
          this.game.move(possibleNextMoves[i]);
          bestMove = Math.min(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
          this.game.undo();
          beta = Math.min(beta, bestMove);
          if (beta <= alpha){
            return bestMove;
           // console.log('dosbest ' + bestMove);
          }
        }
      }


      return bestMove;
     // console.log('best;ovie ' + bestMove);
    };


    // the evaluation function for minimax
    const evaluateBoard = (board) => {
      let totalEvaluation = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
        }
      }
     // console.log(totalEvaluation);
      return totalEvaluation;
    };


    const reverseArray = (array) => {
      return array.slice().reverse();
    };

    const whitePawnEval =
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

    const blackPawnEval = reverseArray(whitePawnEval);

    const knightEval =
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

    const whiteBishopEval = [
      [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
      [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
      [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
      [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
      [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
      [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
      [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ];

    const blackBishopEval = reverseArray(whiteBishopEval);

    const whiteRookEval = [
      [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
      [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
    ];

    const blackRookEval = reverseArray(whiteRookEval);

    const evalQueen = [
      [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
      [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
      [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
      [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ];

    const whiteKingEval = [

      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
      [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
      [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
      [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
    ];

    const blackKingEval = reverseArray(whiteKingEval);


    const getPieceValue = (piece, x, y) => {
      if (piece === null) {
        return 0;
      }

      const absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x , y);

      if (piece.color === 'w'){
        return absoluteValue;
      } else {
        return -absoluteValue;
      }
    };


    const getAbsoluteValue = (piece, isWhite, x , y) => {
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


    const makeAImove = () => {
      const bestMove = calculateBestMove();
      this.game.move(bestMove);
      this.board.position(this.game.fen());
    };


    const onDrop = (source, target) => {
      removeGreySquares();

      // see if the move is legal
      const move = this.game.move({
        from: source,
        to: target,
        promotion: 'q'
      });

      // illegal move
      if (move === null) { return 'snapback'; }

      // make legal move for black AI player
      window.setTimeout(makeAImove, 250);
    };


    const onMouseoverSquare = (square, piece) => {
      // get list of possible moves for this square
      const moves = this.game.moves({
        square,
        verbose: true
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) { return; }

      // highlight the square they moused over
      greySquare(square);

      // highlight the possible squares for this piece
      for (let i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
      }
    };

    const onMouseoutSquare = (square, piece) => {
      removeGreySquares();
    };


    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    const onSnapEnd = () => {
      this.board.position(this.game.fen());
    };





///////////////////////////////
    const config = {
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
      onSnapEnd: onSnapEnd
      };


    this.board = new ChessBoard( 'chessboard', config );




  }










}
