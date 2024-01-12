import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title: string = "Labs!";
  tasks = signal<string[]>([
    "Install Angular CLI",
    "Study Angular!",
    "Create projects with Angular",
    "Integrate APIs with Angular"
  ]);
  name = signal("Nicole");
  disabled: boolean = true;
  image: string = "https://picsum.photos/123";

  colorCtrl = new FormControl();

  constructor() {
    this.colorCtrl.valueChanges.subscribe(console.log);
  }

  handleChange() {
    console.log("HOLA");
  }

  handleDoubleChange() {
    console.log("Doble HOLA");
  }

  handleInputChange(event: Event) {
    console.log(event);
  }

  handleInputSignalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.name.set(newValue);
  }
}
