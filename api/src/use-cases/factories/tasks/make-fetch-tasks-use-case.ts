import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository"
import { FetchTasksUseCase } from "../../tasks/fetch"

export function makeFetchTasksUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const fetchTasksUseCase = new FetchTasksUseCase(tasksRepository)

  return fetchTasksUseCase
}
