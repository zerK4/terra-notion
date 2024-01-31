'use server';

import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const getNavStories = async () => {
  try {
    const user = await currentUser();

    if (user === null) {
      redirect('/login');
    }

    const stories: {
      id: string;
      title: string;
      icon: any;
      sharedLink: string | null;
    }[] = await db
      .select({
        id: pages.id,
        title: pages.name,
        icon: pages.icon,
        sharedLink: pages.shared_link,
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

export const createStory = async () => {
  try {
    const user = await currentUser();

    if (user === null) {
      redirect('/login');
    }

    const email = user.emailAddresses[0].emailAddress;

    const updateDate = new Date();

    const data = await db
      .insert(pages)
      .values({
        name: 'Page title',
        updated_at: updateDate as any,
        user_id: email,
        json: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: 'text',
                  text: 'Page title',
                },
              ],
            },
          ],
        },
      })
      .returning();

    return data[0];
  } catch (err: any) {
    console.log(err, 'Got an error inserting a new page in the database.');
  }
};

export async function updatePage(data: string) {
  try {
    const user = await currentUser();
    if (user === null) {
      redirect('/login');
    }

    const updateDate = new Date();
    const json = JSON.parse(data as any);
    const page = await db
      .update(pages)
      .set({
        name: json.pageTitle.length === 0 ? 'Page title' : json.pageTitle,
        updated_at: updateDate as any,
        json: json.json,
      })
      .where(eq(pages.id, json.pageId))
      .returning();

    console.log(`/${json.path} to revalidated`);

    revalidatePath(`/`);
  } catch (err: any) {
    console.log(err.message, 'Got an error sending a new page to the server.');

    return err;
  }
}

export const updatePageIcon = async ({
  pageId,
  icon,
}: {
  pageId: string;
  icon: any;
}) => {
  try {
    const user = await currentUser();

    if (user === null) {
      redirect('/login');
    }

    const data = await db
      .update(pages)
      .set({
        icon: icon,
      })
      .where(eq(pages.id, pageId))
      .returning();

    revalidatePath(`/${pageId}`);

    return {
      data,
    };
  } catch (err: any) {
    console.log(
      err.message,
      'Got an error updating the icon of the page on the controller.'
    );

    return err;
  }
};

export const remove = async ({
  what,
  pageId,
}: {
  what: string;
  pageId: string;
}) => {
  try {
    const user = await currentUser();

    if (user === null) {
      redirect('/login');
    }

    const data = await db
      .update(pages)
      .set({
        [what]: null,
      })
      .where(eq(pages.id, pageId))
      .returning();

    revalidatePath(`/${pageId}`);

    return {
      data,
    };
  } catch (err: any) {
    console.log(err.message, 'Got an error removing from story.');
    return err;
  }
};

export const update = async ({
  what,
  data: items,
  id,
}: {
  what: string;
  data: string;
  id: string;
}) => {
  try {
    const item = await db
      .update(pages)
      .set({
        [what]: items,
      })
      .where(eq(pages.id, id))
      .returning();

    revalidatePath(`/${id}`);
    return { data: item };
  } catch (err: any) {
    console.log(
      err.message,
      'Got an error updating the page on the controller.'
    );

    return err;
  }
};
