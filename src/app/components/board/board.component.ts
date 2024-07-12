import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameService, User } from '../../game.service';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent, MatButton],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private gameService: GameService;
  squares: any[] = [];
  xIsNext: boolean = false;
  winner!: User | null | undefined;
  player1Name: string = '';
  player2Name: string = '';
  currentPlayer!: User;

  constructor(private router: Router, gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
    this.newGame();
  }

  finishGame() {
    this.router.navigate(['winner']);
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    let randomIndex: number = Math.floor(
      Math.random() * this.gameService.users.length
    );
    this.currentPlayer = this.gameService.users[randomIndex];
  }

  get player() {
    return this.currentPlayer;
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player.symbol);
      this.currentPlayer = this.gameService.users.filter(
        (u) => u !== this.currentPlayer
      )[0];
    }

    let emptySquares = this.squares.filter((s) => s == null);

    this.winner = this.calculateWinner();
    this.gameService.setWinner(this.winner);
    if (this.winner != null || emptySquares.length < 1) this.finishGame();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        let winningSymbol = this.squares[a];
        let winner = this.gameService.users.find(
          (u) => u.symbol == winningSymbol
        );
        return winner;
      }
    }
    return null;
  }
}
