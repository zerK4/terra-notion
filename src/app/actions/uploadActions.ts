'use server';

import { v4 } from 'uuid';
import { utapi } from '../api/uploadthing/core';
import { revalidatePath } from 'next/cache';
import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export async function uploadFiles(
  formData: FormData,
  pagename: string,
  username: string,
  pageid: string
) {
  const files: any = formData.getAll('file');

  const response: any = await utapi.uploadFiles(files);

  if (response[0].data?.key) {
    const data = await utapi.renameFiles({
      fileKey: response[0].data?.key,
      newName: `${pagename}-${username}-${v4()}`,
    });
  }

  console.log(response[0], 'upload response');

  try {
    const data = await db
      .update(pages)
      .set({
        cover_image: response[0].data?.url,
      })
      .where(eq(pages.id, pageid))
      .returning();

    console.log(data);

    revalidatePath('/');
    return {
      data: data[0],
      status: true,
    };
  } catch (err: any) {
    console.log(
      err.message,
      'got a message sending the cover to the server in action'
    );

    return err;
  }
}
