import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [disabled]="disabled" *ngIf="!value">{{ value }}</button>
    <button disabled *ngIf="value == 'X'">
      {{ value }}
    </button>
    <button disabled *ngIf="value == 'O'">
      {{ value }}
    </button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; }'],
})
export class SquareComponent {
  @Input() value: 'X' | 'O' = 'X';
  @Input() disabled: boolean = false;
}
