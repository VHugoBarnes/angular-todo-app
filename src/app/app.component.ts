import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
