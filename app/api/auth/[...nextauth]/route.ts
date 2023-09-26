import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";

import prisma from "@/app/libs/prismadb";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      image: string;
      email: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {},
      async authorize(credentials, req) {
        const validator = new AuthDataValidator({
          botToken: `${process.env.BOT_TOKEN}`,
        });

        const data = objectToAuthDataMap(req.query || {});

        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          const userData = {
            id: user.id.toString(),
            email: user.id.toString(),
            first_name: user.first_name,
            last_name: user.last_name,
            image: user.photo_url,
          };

          try {
            await prisma.user.upsert({
              where: {
                id: userData.id,
              },
              create: {
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                image: userData.image,
              },
              update: {
                image: userData.image,
              },
            });
          } catch {
            console.log("error oauth");
          }

          return userData;
        }
        return null;
      },
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
