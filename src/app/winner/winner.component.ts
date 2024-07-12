import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.scss',
})
export class WinnerComponent implements OnInit {
  private gameService: GameService;

  constructor(private router: Router, gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {}

  get winner() {
    return this.gameService.getWinner();
  }

  startNewGame() {
    this.gameService.clearGame();
    this.router.navigate(['/']);
  }
}
