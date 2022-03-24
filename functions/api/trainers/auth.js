
/**
 * Authorize Trainers
 */

import sha256 from 'crypto-js/sha256'
import cryptoJs from 'crypto-js'
import jwt from '@tsndr/cloudflare-worker-jwt'

export async function onRequestPost({ request, env }) {
  const store = env.TRAINERS

  const { token } = await request.json()

  try {
    if (await jwt.verify(token, env.TOKEN_KEY ?? 'Swoosh-Pushiness-Affected-Sanitizer-Entwine-Enrich')) {
      const id = await store.get(`tokens:${token}`)
      if (id) {
        const user = JSON.parse(await store.get(id))

        delete user.password
        return new Response(JSON.stringify({
          success: true,
          user: { username: id.slice(5), ...user },
        }))
      }
    }
  }
  catch (e) {}

  return new Response(JSON.stringify({
    success: false,
    error: 'Invalid signature.',
  }), { status: 401 })
}
