import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findById(userID).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    return NextResponse.json({ message: "User found", user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
