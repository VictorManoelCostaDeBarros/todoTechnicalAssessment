import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateTaskUseCase } from '../../../use-cases/factories/tasks/make-create-task-use-case'
import moment from "moment"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.string(),
    due: z.string(),
  })

  const { name, description, type, due } = createTaskBodySchema.parse(request.body)

  try {
    const createTask = makeCreateTaskUseCase()
    const task = await createTask.execute({
      name,
      description,
      type,
      due, 
    })
    
    return reply.status(201).send(task)
  } catch (err) {
    throw err    
  }

}
