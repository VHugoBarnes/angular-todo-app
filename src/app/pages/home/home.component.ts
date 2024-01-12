import { CommonModule } from '@angular/common';
import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { Task, TaskState } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);
  tasksLeft = computed(() => this.tasks().filter(t => t.completed === false).length);
  tasksToShow = computed(() => {
    if (this.filter() === TaskState.all) return this.tasks();
    if (this.filter() === TaskState.pending) return this.tasks().filter(t => t.completed === false);
    if (this.filter() === TaskState.completed) return this.tasks().filter(t => t.completed === true);

    return this.tasks()
  });

  filter = signal<TaskState>(TaskState.all);
  Filters = TaskState;

  newTaskCtrl = new FormControl("", {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern("^\\S.*$")
    ]
  });
  editedTask = new FormControl("", {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern("^\\S.*$")
    ]
  });

  injector = inject(Injector);

  constructor() {

  }

  ngOnInit() {
    const tasksLocalStorage = localStorage.getItem("tasks");

    if (tasksLocalStorage) {
      const tasks = JSON.parse(tasksLocalStorage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, { injector: this.injector });
  }

  changeHandler() {
    if (this.newTaskCtrl.invalid) return;

    const value = this.newTaskCtrl.value;
    this.addTask(value.trim());
    this.newTaskCtrl.setValue("");
  }

  deleteTask(index: string) {
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

  enableEditingMode(index: string) {
    this.tasks.update(tasks => tasks.map((task) => {
      if (task.id === index) {
        return {
          ...task,
          editing: true
        }
      }

      return {
        ...task,
        editing: false
      };
    }));

    const taskToUpdate = this.tasks().find(task => task.id === index);
    this.editedTask.setValue(taskToUpdate?.title ?? "");
  }

  updateTask(index: string) {
    if (this.editedTask.invalid) {
      this.tasks.update(tasks => tasks.map((task) => {
        if (task.id === index) {
          return {
            ...task,
            editing: false
          }
        }

        return task;
      }));
    } else {
      this.tasks.update(tasks => tasks.map((task) => {
        if (task.id === index) {
          return {
            ...task,
            title: this.editedTask.value.trim(),
            editing: false
          }
        }

        return task;
      }));
    }

    this.editedTask.setValue("");
  }

  private addTask(title: string) {
    const newTask: Task = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  changeFilter(filter: TaskState) {
    this.filter.set(filter);
  }
}
