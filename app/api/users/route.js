import { NextResponse } from "next/server";

export async function GET() {
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" }
    ];
    return NextResponse.json({status: true, message: "Users fetched successfully", users}, { status: 200 });
}

export async function POST(request) {
    const { name,email, mobile, password, state } = await request.json();
    const newUser = { id: Date.now(), name,email, mobile, password, state };
    return NextResponse.json({status: true, message: "User created successfully", user: newUser}, { status: 201 });
}

export async function PUT(request) {
    const { id, name,email, mobile, password, state } = await request.json();
    const updatedUser = { id, name,email, mobile, password, state };
    return NextResponse.json({status: true, message: "User updated successfully", user: updatedUser}, { status: 200 });
}

export async function DELETE(request) {
    const { id } = await request.json();
    return NextResponse.json({hello: "worlds", status: true, message: "User deleted successfully", id}, { status: 200 });
}
