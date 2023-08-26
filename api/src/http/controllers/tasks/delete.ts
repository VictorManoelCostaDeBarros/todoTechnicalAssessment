
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDeleteTaskUseCase } from "../../../use-cases/factories/tasks/make-delete-task-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";


export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {

  const deleteTaskParamsSchema = z.object({
    id: z.string().uuid()
  })

  const { id } = deleteTaskParamsSchema.parse(request.params)

  try {

    const deleteTask = await makeDeleteTaskUseCase()

    await deleteTask.execute({ id })

  } catch (err) {

    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send("Tasks Deleted with success")


}