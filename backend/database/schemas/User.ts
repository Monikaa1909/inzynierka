import { InferSchemaType, Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = 'kotek,piesek8osmiornica'

const schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Missing informations - firstname is required']
  },
  lastName: {
    type: String,
    required: [true, 'Missing informations - lastname is required']
  },
  academy: {
    type: Schema.Types.ObjectId,
    required: [true, 'Missing informations - each trainer must belong to the academy']
  },
  email: {
    type: String, 
    // lowercase: true, 
    unique: true, 
    required: [true, "Missing informations - each user must have an e-mail"], 
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'E-mail is invalid'], 
    index: true
  },
  login: {
    type: String, 
    lowercase: true, 
    unique: true, 
    required: [true, "Missing informations - each user must have a login"], 
    match: [/^[a-zA-Z0-9]+$/, 'Login is invalid'], 
    index: true
  },
  password: {
    type: String,
    required: true
  }
})

schema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt()

  // hash the password along with our new salt
  const hash = await bcrypt.hash(user.password, salt)
  
  // override the cleartext password with the hashed one
  user.password = hash
  next()
})

schema.methods.validatePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

schema.methods.createToken = function () {
  return jwt.sign({
    id: this._id,
    type: this.__t,
    login: this.login
  }, JWT_SECRET)
}

export type User = InferSchemaType<typeof schema>

export default schema 
