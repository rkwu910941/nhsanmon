import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'
import {
  createError,
  getRouterParam,
  readBody
} from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid todo id'
    })
  }

  const body = await readBody<{
    title?: string
    completed?: boolean
  }>(event)

  const values: {
    title?: string
    completed?: boolean
    updatedAt: Date
  } = {
    updatedAt: new Date()
  }

  if (body.title !== undefined) {
    const title = body.title.trim()

    if (!title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Todo title cannot be empty'
      })
    }

    values.title = title
  }

  if (body.completed !== undefined) {
    values.completed = Boolean(body.completed)
  }

  const [todo] = await db
    .update(schema.todos)
    .set(values)
    .where(eq(schema.todos.id, id))
    .returning()

  if (!todo) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Todo not found'
    })
  }

  return todo
})