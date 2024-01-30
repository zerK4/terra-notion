'use server';

import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const getNavStories = async () => {
  try {
    const user = await currentUser();

    if (user === null) {
      redirect('/login');
    }

    const stories = await db
      .select({
        id: pages.id,
        title: pages.name,
        icon: pages.icon,
      })
      .from(pages)
      .where(eq(pages.user_id, user.emailAddresses[0].emailAddress));

    return {
      stories,
    };
  } catch (err: any) {
    console.log(err.message, 'in storyActions.ts');

    return err;
  }
};
