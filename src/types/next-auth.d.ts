import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      address: string;
      id: string;
    } & DefaultSession['user'];
  }
  interface SignIn {
    email: {
      email: string;
    };
  }
}
