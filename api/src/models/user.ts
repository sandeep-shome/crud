import mongoose, { Schema, Model, Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  phone: string;
}

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 255,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel: Model<User> =
  (mongoose.models.Users as Model<User>) || mongoose.model("Users", userSchema);
export default userModel;
