import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: 'email', placeholder: 'user@quizme.com' },
                password: { label: "Password", type: 'password', placeholder: '&#9679;&#9679;&#9679;&#9679;&#9679;' }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password ) return null;

                const dbUser = await prisma.user.findFirst({
                    where: { email: credentials.email }
                });

                if (dbUser && dbUser.password === credentials.password) {
                    const { password, created_at, updated_at, id, ...dbUserWithoutPassword } = dbUser;
                    return dbUserWithoutPassword as any;
                }

                return null;

            }
        })
    ],
}

const handler=NextAuth(options)

export {handler as GET , handler as POST}
