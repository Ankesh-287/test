import {connect} from "@/dbConfig/dbConfig";
import  User from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: any) {
    try {
        await connect();
        const reqBody = await request.json()
        const {email} = reqBody;

        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404})
        }
        
        await sendEmail({email, emailType: "RESET",  userId: user._id,})

        return NextResponse.json({message: "Email Sent Successfully"});

    } catch (error: any) {
        console.error("Error sending reset password email:", error);
        return NextResponse.json(
            { message: "Error sending reset password email" },
            { status: 500 }
          );
      
    }
}