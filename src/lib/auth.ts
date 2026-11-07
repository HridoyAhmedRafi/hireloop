import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloop-db");

const ROLES = ["seeker", "recruiter", "admin"] as const;

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: [...ROLES],
        required: false,
        defaultValue: "seeker",
        input: true,
        validator: {
          input: {
            "~standard": {
              version: 1,
              vendor: "hireloop",
              validate(value) {
                return ROLES.includes(value as (typeof ROLES)[number])
                  ? { value }
                  : {
                      issues: [
                        { message: "Role must be seeker, recruiter or admin" },
                      ],
                    };
              },
            },
          },
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
