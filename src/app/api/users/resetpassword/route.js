import { connect } from "@/dbConfig/dbConfig.js";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password update successfully",
      successful: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
