'use server';

import type { Session, User } from 'lucia';
import { cache } from 'react';
import { ActionResult } from 'next/dist/server/app-render/types';
import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { v4 } from 'uuid';
import { sendLoginEmail } from '@/src/lib/resend';
import { generateStrongToken } from '@/src/lib/utils';
import { lucia } from '@/src/auth/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login({
  email,
  name,
}: {
  email: string;
  name?: string | null | undefined;
}): Promise<ActionResult> {
  if (email === null) {
    return {
      status: 401,
      error: 'Invalid email',
    };
  }

  const token = generateStrongToken(120);

  const [exists] = await db
    .select()
    .from(users)
    .where(eq(users.email, email as string));

  if (exists === undefined && name === null) {
    return {
      status: 404,
      message: 'Please create an account.',
    };
  }

  if (exists) {
    await db.update(users).set({ token }).where(eq(users.email, email));
    await sendLoginEmail({ to: String(email), token });

    return {
      status: 200,
      message: 'Check your email for a login link.',
    };
  }

  if (email !== null && name !== null) {
    const [user] = await db
      .insert(users)
      .values({
        id: v4(),
        email: email as string,
        name: name as string,
      })
      .returning();

    if (user !== undefined) {
      await db.update(users).set({ token }).where(eq(users.email, email));
      await sendLoginEmail({ to: String(email), token });
    }

    return {
      status: 200,
      message: 'Account successfully created, you can now login!',
    };
  }

  setTimeout(
    async () => {
      await db.update(users).set({ token: null }).where(eq(users.email, email));
    },
    24 * 60 * 60 * 1000
  );
}

export async function validate(token: string) {
  const [user] = await db.select().from(users).where(eq(users.token, token));
  console.log(user, 'this is the user');
  if (user !== undefined) {
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    console.log(cookies().get(sessionCookie.name), 'this is the cookie');

    redirect('/');
  }
}

export async function getSession(): Promise<{
  user: User | null;
  session: Session | null;
}> {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);

    // next.js throws when you attempt to set cookie when rendering page
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    } else if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    return result;
  } catch (error) {
    console.error('Error in getSession:', error);
    return { user: null, session: null };
  }
}

export async function logout(): Promise<ActionResult> {
  const { session } = await getSession();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/login');
}
