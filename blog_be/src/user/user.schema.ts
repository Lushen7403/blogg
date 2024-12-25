import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    account: String,
    password: String
})