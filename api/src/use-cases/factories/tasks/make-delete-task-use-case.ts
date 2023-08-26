import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository"
import { DeleteTaskUseCase } from "../../tasks/delete"

export function makeDeleteTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository)

  return deleteTaskUseCase
}