import moongose, { Schema } from "mongoose";

export interface IUser {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
}

const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
});

const User = moongose.model<IUser>("User", userSchema);

export default User;
