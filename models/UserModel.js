import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  matches: {
    total: { type: Number },
    won: { type: Number },
    lose: { type: Number },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
