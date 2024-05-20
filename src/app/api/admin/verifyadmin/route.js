import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request) {
  try {
    const userID = await getDataFromToken(request);
    if (!userID) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const user = await User.findById(userID).select("-password");

    if (user.isAdmin) {
      return NextResponse.json({ message: "Access Granted", data: user });
    } else {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
