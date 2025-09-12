import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { signInSchema } from "./lib/zod";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userName: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            throw new Error("Credentials are required");
          }

          // Validate credentials using Zod
          const { userName, password } = await signInSchema.parseAsync(
            credentials
          );

          // Check against environment variables
          if (userName === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            return { name: "Admin" };
          }

          throw new Error("Invalid username or password");
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Collect all Zod validation errors into a single string
            const messages = error.issues.map((e) => e.message).join(", ");
            throw new Error(messages);
          } else if (error instanceof Error) {
            throw error; // Use the error message
          } else {
            throw new Error("Unknown error during login");
          }
        }
      },
    }),
  ],

  pages: {
    signIn: "/admin-login",
  },
});
