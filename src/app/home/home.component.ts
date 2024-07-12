import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatButton,
    MatCardModule,
    MatIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private gameService: GameService;
  player1Name!: string;
  player2Name!: string;
  showAlert: boolean = false;
  gameStarted: boolean = false;

  constructor(private router: Router, gameService: GameService) {
    this.gameService = gameService;
    this.gameStarted = this.gameService.users.length > 0;
  }

  ngOnInit(): void {
    this.player1Name = this.gameService?.users[0]?.name;
    this.player2Name = this.gameService?.users[1]?.name;
  }

  setupGame() {
    this.showAlert = false;

    if (this.player1Name && this.player2Name) {
      this.gameService.setUsers(this.player1Name, this.player2Name);
      this.router.navigate(['game-setup']);
    } else {
      this.showAlert = true;
    }
  }

  clearGame() {
    this.player1Name = '';
    this.player2Name = '';
    this.gameService.clearGame();
  }
}
