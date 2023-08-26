import { Task } from "@prisma/client";
import { TasksRepository } from "../../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ToggleTaskStatusUseCaseRequest {
  id: string,
  isDone: boolean
}

interface ToggleTaskStatusUseCaseResponse {
  task: Task
}

export class ToggleTaskStatusUseCase {
  constructor(private tasksRepository: TasksRepository) { }
  
  async execute({ id, isDone }: ToggleTaskStatusUseCaseRequest): Promise<ToggleTaskStatusUseCaseResponse> {
    const taskResponse = await this.tasksRepository.findById(id)

    if (!taskResponse) {
      throw new ResourceNotFoundError()
    }

    const task = await this.tasksRepository.toggleTaskStatus(id, isDone)

    return { task }

  }
}