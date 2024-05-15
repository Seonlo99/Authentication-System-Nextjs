import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    //check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      //send verification email
      await sendEmail({ email, emailType: "RESET", userId: user._id });
    }

    return NextResponse.json({
      message: "Reset email will be sent if email exist",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
