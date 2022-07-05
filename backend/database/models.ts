import type { Model } from 'mongoose'
import mongoose from 'mongoose'

const models = {} as Record<string, Model<unknown>>
for (const [name, { default: schema }] of Object.entries(import.meta.globEager('./schemas/*.ts'))) {
    models[name.slice(10, -3)] = mongoose.model(name.slice(10, -3), schema)
}

export default models