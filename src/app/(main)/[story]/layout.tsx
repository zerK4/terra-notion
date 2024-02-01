import React, { ReactElement } from 'react';
import Sidebar from '../components/sidebar';
import TopBanner from '../components/topBanner';
import { getNavStories } from '../../actions/storyActions';
import { CommandMenu } from '../components/commandMenu';
import { db } from '@/src/db';
import { pages, users } from '@/src/db/schema';
import { and, eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: { story: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const data = await db
    .select()
    .from(pages)
    .where(
      and(
        eq(pages.id, params.story),
        eq(pages?.user_id, user?.emailAddresses[0].emailAddress as string)
      )
    );

  return {
    title: data[0]?.name || 'Page title',
  };
}

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const { stories } = await getNavStories();
  const data = await db
    .select({
      totalArchived: users.total_archived,
    })
    .from(users)
    .where(eq(users.email, user?.emailAddresses[0].emailAddress));

  const { totalArchived } = data[0];

  return (
    <div className="flex flex-col">
      <TopBanner />
      <div className="flex">
        <Sidebar
          totalArchived={totalArchived}
          stories={stories && JSON.stringify(stories)}
        />
        <div className="w-full">{children}</div>
        <CommandMenu />
      </div>
    </div>
  );
}

export default DashboardLayout;
