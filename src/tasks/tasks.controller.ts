import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query
} from '@nestjs/common';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';
import {TaskStateEnum} from "./shared/task-state.enum";


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {}

  @Get()
  async getAll(@Query('q') q?: TaskStateEnum): Promise<Task[]> {
    return this.tasksService.getAll(q);
  }

  @Delete('/clear-all')
  async clearAll(): Promise<Task[]> {
    return this.tasksService.clearAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    task.id = id;

    return this.tasksService.update(task);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.tasksService.delete(id)
  }
}
