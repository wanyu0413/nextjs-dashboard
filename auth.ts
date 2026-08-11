import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
 
// Export the auth, signIn, and signOut functions from the NextAuth library.
export const { auth, signIn, signOut } = NextAuth({
  // Spread the authConfig object into the NextAuth configuration.
  ...authConfig,
  // providers is an array where you list different login options such as Google or GitHub.
  // Here we are using the Credentials provider to login with a username and password.
  providers: [Credentials({})],
});