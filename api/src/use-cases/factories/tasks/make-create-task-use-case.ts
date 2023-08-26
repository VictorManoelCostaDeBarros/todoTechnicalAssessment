import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository"
import { CreateTaskUseCase } from "../../tasks/create"

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const createTasksUseCase = new CreateTaskUseCase(tasksRepository)

  return createTasksUseCase
}
