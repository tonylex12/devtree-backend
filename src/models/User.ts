import moongose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = moongose.model<IUser>("User", userSchema);

export default User;
