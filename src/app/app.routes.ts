import { Routes } from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { WinnerComponent } from './winner/winner.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game-setup', component: GameSetupComponent },
  { path: 'game', component: GameComponent },
  { path: 'winner', component: WinnerComponent },
];
