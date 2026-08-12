export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  return {
    loggedIn: true,
    user: session.user
  }
})