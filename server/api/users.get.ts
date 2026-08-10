export default defineEventHandler(async () => {
  const db = useDatabase()
  const result = await db.sql`SELECT * FROM users ORDER BY id ASC`

  return result.rows
})