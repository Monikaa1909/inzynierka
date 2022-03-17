export async function onRequestPost({ request }) {
  const { username, password } = await request.json()

  let token = null
  if (username === 'monika' && password === '12345678')
    token = 'meh'

  return new Response(JSON.stringify({
    token,
  }))
}
