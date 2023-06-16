import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';


export const OPTIONS: NextAuthOptions = {
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

                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                };

                const response = await axios.post('http://localhost:3000/api/auth/signin', payload);

                const user = response.data;
                
                if(user) return user; 

                return null;

            }
        })
    ],
}

const handler=NextAuth(OPTIONS)

export {handler as GET , handler as POST}
