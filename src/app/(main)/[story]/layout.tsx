import React, { ReactElement } from 'react';
import Sidebar from '../components/sidebar';
import TopBanner from '../components/topBanner';
import { Toaster } from '@/src/components/ui/sonner';
import { getNavStories } from '../../actions/storyActions';
import { CommandMenu } from '../components/commandMenu';
import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs';

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
