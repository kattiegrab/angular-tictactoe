import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [MatButton, MatCardModule, RouterModule],
  templateUrl: './game-setup.component.html',
  styleUrl: './game-setup.component.scss',
})
export class GameSetupComponent implements OnInit {
  private gameService: GameService;
  player1Name!: string;
  player2Name!: string;
  player1Symbol!: string | undefined;
  player2Symbol!: string | undefined;

  constructor(private router: Router, gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
    this.player1Name = this.gameService?.users[0].name;
    this.player2Name = this.gameService?.users[1].name;
    this.player1Symbol = this.gameService?.users[0].symbol;
    this.player2Symbol = this.gameService?.users[1].symbol;
  }
}
