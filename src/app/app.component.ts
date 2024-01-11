import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-practice';
  tasks: string[] = [
    "Install Angular CLI",
    "Study Angular!",
    "Create projects with Angular",
    "Integrate APIs with Angular"
  ];
}
