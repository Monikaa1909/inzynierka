/**
 * Register Trainers
 */

import sha256 from 'crypto-js/sha256'
import cryptoJs from 'crypto-js'
import jwt from '@tsndr/cloudflare-worker-jwt'

export async function onRequestPost({ request, env }) {
  const store = env.TRAINERS

  const { username, password } = await request.json()

  const id = `user:${username}`
  let user = await store.get(id)

  if (user) {
    return new Response(JSON.stringify({
      success: false,
      error: 'User already exists.',
    }), { status: 409 })
  }

  const hashedPassword = sha256(password).toString(cryptoJs.enc.Hex)
  const token = await jwt.sign({
    username,
    exp: Math.floor(Date.now() / 1000) + (2 * (60 * 60)),
  }, env.TOKEN_KEY ?? 'Swoosh-Pushiness-Affected-Sanitizer-Entwine-Enrich')

  user = {
    password: hashedPassword,
    // TODO [$62417ad5860a3a064ae65769]: Add name and other stuff from `request.json()`
  }

  await Promise.all([
    store.put(id, JSON.stringify(user)),
    store.put(`tokens:${token}`, id),
  ])

  delete user.password
  return new Response(JSON.stringify({
    success: true,
    token,
    user: { username, ...user },
  }))
}
