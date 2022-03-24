/**
 * Login Trainers
 */

import sha256 from 'crypto-js/sha256'
import cryptoJs from 'crypto-js'
import jwt from '@tsndr/cloudflare-worker-jwt'

export async function onRequestPost({ request, env }) {
  const store = env.TRAINERS

  const { username, password } = await request.json()
  const id = `user:${username}`

  const hashedPassword = sha256(password).toString(cryptoJs.enc.Hex)
  const user = await store.get(id)

  if (user && user.password === hashedPassword) {
    const token = jwt.sign({
      username,
      exp: Math.floor(Date.now() / 1000) + (2 * (60 * 60)),
    }, env.TOKEN_KEY)

    await store.put(`tokens:${token}`, id)

    delete user.password
    return new Response(JSON.stringify({
      success: true,
      token,
      user,
    }))
  }

  return new Response(JSON.stringify({
    success: false,
    error: 'Invalid credentials',
  }), { status: 400 })
}
