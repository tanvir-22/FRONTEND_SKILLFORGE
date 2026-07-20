import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

// Same-origin: the frontend hosts its own Better Auth route handler
// (src/app/api/auth/[...all]/route.js), sharing the same MongoDB database
// and BETTER_AUTH_SECRET as the Express backend so sessions are valid on
// both. Business API calls (non-auth) still go to NEXT_PUBLIC_BACKEND_URL.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [adminClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
