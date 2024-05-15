import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DB_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("DB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("DB connection error." + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
