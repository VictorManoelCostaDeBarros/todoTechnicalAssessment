import { ToggleTaskStatusUseCase } from "../../tasks/toggleStatus"
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";

export function makeToggleTaskStatusUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const toggleTaskStatusUseCase = new ToggleTaskStatusUseCase(tasksRepository)

  return toggleTaskStatusUseCase
}