import { Metadata } from 'next';
import React from 'react';
import { getSession } from '../actions/authActions';
import { redirect } from 'next/navigation';
import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Login || Terra',
  description: 'Login page for terra.',
};

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getSession();

  if (user) {
    const stories = await db
      .select()
      .from(pages)
      .where(eq(pages.user_id, user?.id));
    if (stories.length > 0) {
      redirect(`/${stories[0].id}`);
    }
    redirect('/');
  }

  return <div>{children}</div>;
}
