import { Task } from "@prisma/client";

import { TasksRepository } from "../../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteTaskUseCaseRequest {
  id: string
}

interface DeleteTaskUseCaseResponse {
  task: Task
}

export class DeleteTaskUseCase {

  constructor(private tasksRepository: TasksRepository) { }

  async execute({ id }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {

    const taskResponse = await this.tasksRepository.findById(id)

    if (!taskResponse) {
      throw new ResourceNotFoundError()
    }

    const task = await this.tasksRepository.delete(id)

    return { task }
  }

}