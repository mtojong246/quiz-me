import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
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

                const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/signin`, payload);

                const user = response.data;
                
                if(user) return user; 
                

                return null;

            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    // cookies: cookies,
    callbacks: {
        async jwt({token, user, account, trigger, session, profile}) {
            if (account) {
                //token = Object.assign({}, token, { accessToken: account.access_token });
            }
            if (account && account.provider === 'google') {
                try {
                    const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/google`, { email: profile?.email, username: profile?.name });
                    if (response) {
                        user = response.data;
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }

            if (account && account.provider === 'facebook') {
                console.log(profile);
            }
            if (trigger === 'update') {
                return { ...token, ...session.user }
            }

            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    }
}