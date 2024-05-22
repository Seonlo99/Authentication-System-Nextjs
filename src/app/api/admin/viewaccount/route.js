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

    const user = await User.findById(userID);

    if (!user.isAdmin) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    const usersData = await User.find(
      { isAdmin: false },
      { username: 1, email: 1, role: 1, isVerified: 1 }
    );

    return NextResponse.json(
      { message: "Data retrived successfully", usersData: usersData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
