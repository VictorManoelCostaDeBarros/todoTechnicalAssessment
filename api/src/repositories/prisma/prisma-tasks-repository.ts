import { $Enums, Prisma } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import { prisma } from "../../lib/prisma";

export class PrismaTasksRepository implements TasksRepository {
  async findById(id: string) {
    const task = await prisma.task.findFirstOrThrow({ where: { id } })

    return task
  }

  async findMany() {
    const tasks = await prisma.task.findMany()

    return tasks
  }

  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({
      data
    })

    return task
  }

  async delete(id: string) {
    const task = await prisma.task.delete({ where: { id } })

    return task
  }

  async toggleTaskStatus(id: string, isDone: boolean) {
    const task = await prisma.task.update({ where: { id }, data: { isDone } })

    return task
  }
}