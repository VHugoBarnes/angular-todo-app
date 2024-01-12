import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: uuidv4(),
      title: "Install Angular CLI",
      completed: false
    },
    {
      id: uuidv4(),
      title: "Study Angular!",
      completed: false
    },
    {
      id: uuidv4(),
      title: "Create projects with Angular",
      completed: true,
    },
    {
      id: uuidv4(),
      title: "Integrate APIs with Angular",
      completed: false
    }
  ]);
  tasksLeft = computed(() => this.tasks().filter(t => t.completed === false).length);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
    input.value = "";
  }

  private addTask(title: string) {
    const newTask: Task = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: string) {
    console.log(index);
    this.tasks.update(tasks => tasks.filter((task) => task.id !== index));
  }

  toggleTask(index: string) {
    this.tasks.update(tasks => tasks.map((task) => {
      if (task.id === index) {
        return {
          ...task,
          completed: !task.completed
        }
      }

      return task;
    }));
  }
}
