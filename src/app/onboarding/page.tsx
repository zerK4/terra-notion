import { Spinner } from '@/src/components/Spinner';
import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq, or } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  const exists = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.id, user!.id),
        eq(users.email, user!.emailAddresses[0].emailAddress)
      )
    );

  if (exists.length > 0) {
    redirect('/');
  }

  const newUser = await db
    .insert(users)
    .values({
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      first_name: user.firstName,
      last_name: user.lastName,
    })
    .returning();

  if (newUser.length > 0) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-screen overflow-hidden">
      <div className="text-white/40 animate-pulse">Onboarding...</div>
      <Spinner size={'xl'} />
    </div>
  );
}

export default Page;
