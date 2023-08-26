import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchTasksUseCase } from "../../../use-cases/factories/tasks/make-fetch-tasks-use-case"

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchTasks = makeFetchTasksUseCase()

    const tasks = await fetchTasks.execute()

    return reply.status(200).send(tasks)
  } catch (err) {
    throw err
  }
}
