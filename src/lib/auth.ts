import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloop-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  // The admin() plugin owns `user.role` and marks it input: false, so the role
  // can never come from the sign-up request body. It is assigned server-side
  // in src/lib/actions/signup.ts right after the account is created.
  plugins: [admin({ defaultRole: "seeker", adminRoles: ["admin"] })],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
