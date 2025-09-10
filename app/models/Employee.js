import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true, unique: true },
  gender: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  salary: { type: Number, required: true, trim: true },
},
{
  timestamps: true,
}

);

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
