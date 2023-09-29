import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskDto>){}
  
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskModel.create({status: Status.OPEN, createdAt: Date.now(), updatedAt: Date.now(), ...createTaskDto})
      return task
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskModel.find({})
      if (!tasks) {
        throw new HttpException("No tasks were found!", HttpStatus.NOT_FOUND)
      }

      return tasks
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskModel.findOne({_id: id})
      if (!task) {
        throw new HttpException("No tasks were found!", HttpStatus.NOT_FOUND)
      }

      return task
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.updateOne({_id: id}, {updatedAt: Date.now(), ...updateTaskDto})
      if (!task) {
        throw new HttpException(`No task was found with id => ${id} !`, HttpStatus.NOT_FOUND)
      }

      return task
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskModel.findByIdAndDelete({_id: id})
      if (!task) {
        throw new HttpException(`No task was found with id => ${id} !`, HttpStatus.NOT_FOUND)
      }

      return "Task has been removed!"
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
