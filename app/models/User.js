import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, unique: true },
  gender: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  terms: { type: Boolean, required: true },
},
{
  timestamps: true,
}

);

export default mongoose.models.User || mongoose.model("User", UserSchema);
