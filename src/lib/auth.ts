import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import connectDB from "@/config/mongoose";
import { headers } from "next/headers";

const mongooseConn = await connectDB();

export const auth = betterAuth({
  database: mongodbAdapter(mongooseConn.connection.db),
  emailAndPassword: {
    enabled: true,
  },
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
}
