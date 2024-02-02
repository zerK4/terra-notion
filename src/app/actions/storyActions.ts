'use server';

import { db } from '@/src/db';
import { archived, pages, users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from './authActions';

export const getNavStories = async () => {
  try {
    const { user } = await getSession();

    if (!user) {
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
      .where(eq(pages.user_id, user.id));

    revalidatePath('/');
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
    const { user } = await getSession();

    if (!user) {
      redirect('/login');
    }

    const email = user.id;

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
    const { user } = await getSession();
    if (!user) {
      redirect('/login');
    }

    const updateDate = new Date();
    const json = JSON.parse(data as any);
    const currentPage = await db
      .update(pages)
      .set({
        name: json.pageTitle.length === 0 ? 'Page title' : json.pageTitle,
        updated_at: updateDate as any,
        json: json.json,
      })
      .where(eq(pages.id, json.pageId))
      .returning();

    console.log(`/${currentPage[0].id}`);

    revalidatePath(`/${currentPage[0].id}`);

    return currentPage[0];
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
    const { user } = await getSession();

    if (!user) {
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
    const { user } = await getSession();

    if (!user) {
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

export async function removePage(id: string) {
  try {
    let redirectId = null;
    const allPages = await db.select().from(pages);
    const page = await db.select().from(pages).where(eq(pages.id, id));

    const currentIndex = allPages.findIndex((p) => p.id === id);
    if (currentIndex === allPages.length - 1) {
      redirectId = allPages[currentIndex - 1].id;
    } else {
      redirectId = allPages[currentIndex + 1].id;
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, page[0].user_id));

    const archivedPage = {
      name: page[0].name,
      updated_at: page[0].updated_at,
      user_id: page[0].user_id,
      json: page[0].json,
    };
    const data = await db.insert(archived).values(archivedPage).returning();

    const updatedUser = await db
      .update(users)
      .set({
        total_archived:
          user[0].total_archived === null ? 1 : user[0].total_archived + 1,
      })
      .returning();

    await db.delete(pages).where(eq(pages.id, id));

    revalidatePath(`/${redirectId}`);

    return {
      data: { ...data },
      redirect: `/${redirectId}`,
      length: updatedUser[0].total_archived,
      message: 'Page moved to trash successfully!',
    };
  } catch (err: any) {
    console.log(err.message);
    return err;
  }
}

export const getArchivedStories = async () => {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect('/login');
    }

    const data = await db
      .select()
      .from(archived)
      .where(eq(archived.user_id, user.id));

    return {
      data,
    };
  } catch (err: any) {
    console.log(err.message, 'Cannot get archives on page.controller.ts');

    return err;
  }
};

export const unarchiveStory = async (id: string) => {
  try {
    const archivedPage = await db
      .select()
      .from(archived)
      .where(eq(archived.id, id));
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, archivedPage[0].user_id));

    const data = await db
      .insert(pages)
      .values({
        name: archivedPage[0].name,
        updated_at: archivedPage[0].updated_at,
        user_id: archivedPage[0].user_id,
        json: archivedPage[0].json,
      })
      .returning();

    const userPages = await db
      .update(users)
      .set({
        total_archived:
          user[0].total_archived !== null
            ? ((user[0].total_archived - 1) as number)
            : null,
      })
      .returning();

    await db.delete(archived).where(eq(archived.id, id));

    revalidatePath('/');

    return {
      data: { ...data },
      length: userPages[0].total_archived,
      message: 'Page unarchived successfully!',
    };
  } catch (err: any) {
    console.log(err.message, 'Cannot unarchive pave.');

    return err;
  }
};

export const removeArchived = async (id: string) => {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect('/login');
    }

    const current = await db
      .select()
      .from(users)
      .where(eq(users.email, user.id));
    await db.delete(archived).where(eq(archived.id, id));

    revalidatePath('/');
  } catch (err: any) {
    console.log(err.message, 'got an error removing the archived.');
    return err;
  }
};
