import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeToggleTaskStatusUseCase } from "../../../use-cases/factories/tasks/make-toggle-task-status-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function toggleStatus(request: FastifyRequest, reply: FastifyReply) {

	const ToggleTaskStatusParamsSchema = z.object({
		id: z.string().uuid()
	})

	const ToggleTaskStatusBodySchema = z.object({
		isDone: z.boolean(),
	})

	const { id } = ToggleTaskStatusParamsSchema.parse(request.params)

	const { isDone } = ToggleTaskStatusBodySchema.parse(request.body)

	try {

		const task = await makeToggleTaskStatusUseCase()

		await task.execute({
			id, isDone
		})

	} catch (err) {

		if (err instanceof ResourceNotFoundError) {

			return reply.status(409).send({ message: err.message })

		}
		throw err
	}

	return reply.status(200).send("Tasks Status updated")
}