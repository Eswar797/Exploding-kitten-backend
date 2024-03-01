import mongoose from "mongoose";

export const connectToMongo = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "explodingkitten",
    })
    .then(() => {
      console.log("Connected to database Successfully");
    })
    .catch((error) => {
      console.log("Failed to connect to database", error);
    });
};

