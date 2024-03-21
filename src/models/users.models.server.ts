import { Schema, model } from 'mongoose'
import { IUser } from './users.model.client'
import { hashPassword } from '../utils/hash_password.utils'
import isError from '../utils/is_error.utils'

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}
const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [Role.ADMIN, Role.USER],
        default: Role.USER
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    const hashedPassword = await hashPassword(this.password)
    if (isError(hashedPassword)) {
        return 
    }
    this.password = hashedPassword.data
    next()
})

// json
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret.__v
        delete ret.password
        return ret
    }
})

const userModel = model<IUser>('User', userSchema)

export default userModel
