// src/db/connect.js
import mongoose from "mongoose";

let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("Falta MONGO_URI");
    cached.promise = mongoose.connect(MONGO_URI, { dbName: "BackPWA" })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
