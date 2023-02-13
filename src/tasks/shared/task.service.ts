import { Injectable } from '@nestjs/common';
import { Task } from './task';
import * as stream from 'stream';
import { TaskStateEnum } from './task-state.enum';

@Injectable()
export class TaskService {
  tasks: Task[] | null = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: false },
    { id: 3, description: 'Task 3', completed: true },
    { id: 4, description: 'Task 4', completed: false },
    { id: 5, description: 'Task 5', completed: false },
    { id: 6, description: 'Task 6', completed: false },
    { id: 7, description: 'Task 7', completed: false },
    { id: 8, description: 'Task 8', completed: false },
    { id: 9, description: 'Task 9', completed: false },
    { id: 10, description: 'Task 10', completed: true },
  ];

  getAll(q: TaskStateEnum) {
    if (q && q != TaskStateEnum.ALL) {
      if (q === TaskStateEnum.COMPLETED) {
        return this.tasks.filter((item: Task) => item.completed === true);
      } else if (q === TaskStateEnum.PENDING) {
        return this.tasks.filter((item: Task) => item.completed === false);
      }
    } else {
      return this.tasks;
    }
  }

  getById(id: number) {
    return this.tasks.find((value) => value.id == id);
  }

  create(task: Task) {
    let lastId = 0;

    if (this.tasks.length > 0) {
      lastId = this.tasks[this.tasks.length - 1].id;
    }

    task.id = lastId + 1;

    this.tasks.push(task);

    return task;
  }

  update(task: Task) {
    const taskArray = this.getById(task.id);

    if (taskArray) {
      taskArray.description = task.description
        ? task.description
        : taskArray.description;
      taskArray.completed = task.completed;
    }

    return taskArray;
  }

  delete(id: number) {
    const index = this.tasks.findIndex((value) => value.id == id);

    this.tasks.splice(index, 1);
  }
  clearAll() {
    this.tasks = null;
    return this.tasks;
  }
}
