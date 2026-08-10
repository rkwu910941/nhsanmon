import { db, schema } from '@nuxthub/db'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return await db
    .select()
    .from(schema.todos)
    .orderBy(desc(schema.todos.createdAt))
})