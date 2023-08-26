import { Task, LABEL } from '@prisma/client'
import { TasksRepository } from "../../repositories/tasks-repository"
import moment from 'moment'

interface createTaskUseCaseRequest {
  name: string
  description: string
  type: string
  due?: string
}

interface createTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    name,
    description,
    type,
    due
  }: createTaskUseCaseRequest): Promise<createTaskUseCaseResponse> {
    let label = "POSTPONED" as LABEL

    const tomorrow = moment().add(1, 'days');
    const threeDaysAhead = moment().add(3, 'days');
    const weekAhead = moment().add(7, 'days');
    const fiveDaysAhead = moment().add(5, 'days');
    const monthAhead = moment().add(30, 'days');
    const today = moment(new Date())
    const inputDate = moment(due)

    if (type === 'work' && inputDate.isBetween(today, tomorrow, 'day', '[]')) {
      label = "URGENT"
    } else if (type === 'health' && inputDate.isBetween(today, threeDaysAhead, 'day', '[]')) {
      label = "URGENT"
    } else if (type === 'personal' && inputDate.isBetween(today, weekAhead, 'day', '[]')) {
      label = "POSTPONED"
    } else if (type === 'other' && inputDate.isBetween(today, fiveDaysAhead, 'day', '[]')) {
      label = "POSTPONED"
    } else if (type === 'work' && (name.includes('PLO') || name.includes('GJL')) && inputDate.isBetween(today, monthAhead, 'day', '[]')) {
      label = "POSTPONED"
    } else if (inputDate.isBetween(today, weekAhead, 'day', '[]')) {
      label = "NOTIMPORTANT"
    } else if (type === 'work' && !due) {
      label = "NOTIMPORTANT"
    } else {
      label = "NOTIMPORTANT"
    }

    const task = await this.tasksRepository.create({
      name,
      description,
      type,
      label,
      due,
      isDone: false
    })

    return {
      task
    }
  }
}
