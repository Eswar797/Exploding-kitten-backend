import mongoose from "mongoose";

export const connectToMongo = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      dbName: "Exploding Kitten",
    })
    .then((res) => {
      console.log("Connected to database Successfully", mongoose.connection.host);
    })
    .catch((error) => {
      console.log("Failed to connect to database", error.message);
    });
};
