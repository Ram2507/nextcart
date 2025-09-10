import connectDB from "@/app/lib/mongoose";
import User from "@/app/models/User";
import  bcrypt from 'bcryptjs';

function validateFormData(formData) {
    const { username, email, password, phone, gender, state, terms } = formData;
    if (!username || !email || !password || !phone || !gender || !state || terms === undefined) {
        return { isValid: false, message: "All fields are required." };
    }
    if (password.length < 6) {
        return { isValid: false, message: "Password must be at least 6 characters long." };
    }
    return { isValid: true };
}

export async function POST(request) {
    const formData = await request.json();
    const errors = validateFormData(formData);
    if (!errors.isValid) {
        return new Response(JSON.stringify({ message: errors.message }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    await connectDB();
    const passwordHash = await bcrypt.hash(formData.password, 10);
    try{
        await User.create({ ...formData, password: passwordHash });
        return new Response(JSON.stringify({ message: "User created successfully", success: true }), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }catch(error){
        return new Response(JSON.stringify({ message: "Error creating user", error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
   
}
