'use server';

import { cookies } from 'next/headers';
import { lucia } from '../auth/lucia';

export async function validate(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  console.log(cookies().get(sessionCookie.name), 'this is the cookie');

  // return redirect('/');
}
