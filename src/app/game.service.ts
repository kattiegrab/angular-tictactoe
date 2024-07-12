import { Injectable } from '@angular/core';

export interface User {
  name: string;
  symbol?: string;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  users: User[] = [];
  winner!: User | null | undefined;

  constructor() {
    const users = localStorage.getItem('users');

    if (users) {
      this.users = JSON.parse(users);
    }
  }

  setUsers(player1Name: string, player2Name: string) {
    const symbols = ['O', 'X'];
    let randomIndex: number = Math.floor(Math.random() * symbols.length);
    this.users = [];
    this.users.push(
      {
        name: player1Name,
        symbol: symbols[randomIndex],
      },
      {
        name: player2Name,
        symbol: symbols[randomIndex === 0 ? 1 : 0],
      }
    );
    this.saveUsers();
  }

  setWinner(winner: User | null | undefined) {
    this.winner = winner;
    this.saveWinner();
  }

  getWinner() {
    let winner = localStorage.getItem('winner');
    this.winner = JSON.parse(winner!);
    return this.winner;
  }

  clearGame() {
    this.users = [];
    this.saveUsers();
    this.winner = null;
    localStorage.removeItem('winner');
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private saveWinner() {
    localStorage.setItem('winner', JSON.stringify(this.winner));
  }
}
