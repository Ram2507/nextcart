import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import Employee from "@/app/models/Employee";

function validate(data) {
    const errors = {};
    if (!data.name) errors.name = "Name is required";
    if (!data.email) errors.email = "Email is required";
    if (!data.phone) errors.phone = "Phone is required";
    if (!data.gender) errors.gender = "Gender is required";
    if (!data.designation) errors.designation = "Designation is required";
    if (!data.salary) errors.salary = "Salary is required";
    return errors;
}

export async function GET() {
    await connectDB();
    const employees = await Employee.find().sort({ createdAt: -1 });
    return NextResponse.json({ status: true, employees }, { status: 200 });
}

export async function POST(request) {
    await connectDB();
    const body = await request.json();
    const errors = validate(body)
    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ status: false, message: "Validation errors", errors }, { status: 400 });
    }

    const newEmployee = new Employee(body);
    await newEmployee.save();

    return NextResponse.json({ status: true, message: "Employee created successfully", employee: newEmployee }, { status: 201 });
}