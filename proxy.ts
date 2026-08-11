import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// Import the authConfig object into a Proxy file
// This is a proxy for the NextAuth.js library. It is used to protect our routes.
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  // The matcher option is used to specify the routes that should be protected. In this case, we are protecting all routes except the API routes, static files, and images.
};