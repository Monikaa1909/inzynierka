import type { Model, Schema } from 'mongoose'
import mongoose from 'mongoose'

const models = {} as Record<string, Model<unknown>>
const userSchemas = {} as Record<string, Schema<unknown>>
for (const [name, { default: schema }] of Object.entries(import.meta.glob('./schemas/*.ts', { eager: true }))) {
    const modelName = name.slice(10, -3)
    
    if (modelName.endsWith('.user')) {
        userSchemas[modelName.slice(0, -5)] = schema
        continue
    }
    
    models[modelName] = mongoose.model(name.slice(10, -3), schema)
}

for (const [name, schema] of Object.entries(userSchemas)) {
    models[name] = models.User.discriminator(name, schema)
}

export default models