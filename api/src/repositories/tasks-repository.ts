import { Prisma, Task } from "@prisma/client";

export interface TasksRepository {
  findById(id: string): Promise<Task>
  findMany(): Promise<Task[]>
  create(data: Prisma.TaskCreateInput): Promise<Task>
  delete(id: string): Promise<Task>
  toggleTaskStatus(id: string, isDone: boolean): Promise<Task>
}
