// export { default } from 'next-auth/middleware';
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const url = req.nextUrl.clone();
    url.pathname = '/'

    if (!token) return NextResponse.redirect(url);
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/create-set', 
        '/edit/:path*', 
        '/flash-cards/:path*', 
        '/folders/:path*',
        '/settings',
        '/user',
    ],
}