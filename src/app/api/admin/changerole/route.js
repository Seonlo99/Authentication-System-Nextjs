import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, newRole } = reqBody;

    //check if user exist
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: newRole },
      { returnNewDocument: true }
    );
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Role updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
