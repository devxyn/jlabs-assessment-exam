import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true, unique: true, trim: true },
  password: { type: String, require: true, trim: true },
});

const User = model('User', userSchema);

export default User;
