import { Task } from '@prisma/client'
import { TasksRepository } from "../../repositories/tasks-repository"

interface FetchTasksUseCaseResponse {
  tasks: Task[]
}

export class FetchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<FetchTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findMany()

    return {
      tasks
    }
  }
}
