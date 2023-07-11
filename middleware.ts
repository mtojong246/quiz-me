export { default } from 'next-auth/middleware';
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