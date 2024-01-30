import CoverImage from '@/src/components/CoverImage';
import TextEditor from '@/src/components/editor';
import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react';
import PageIcon from '../components/pageIcon';

const getStories = async (params: any) => {
  const story = await db
    .select({
      name: pages.name,
      content: pages.json,
      updatedAt: pages.updated_at,
      coverImage: pages.cover_image,
      icon: pages.icon,
    })
    .from(pages)
    .where(eq(pages.id, params.story));

  if (story.length === 0) {
    return {
      content: '',
      name: '',
      updatedAt: '',
      coverImage: '',
      icon: null,
    };
  }

  const { content, name, updatedAt, coverImage, icon } = story[0];

  return {
    content,
    name,
    updatedAt,
    coverImage,
    icon,
  };
};

async function page({ params }: { params: { story: string } }) {
  const { content, name, updatedAt, coverImage, icon } =
    await getStories(params);

  return (
    <div className="flex items-center flex-col">
      <CoverImage name={name} coverImage={coverImage} id={params.story} />
      <div className="relative w-[90vw] md:w-[60vw]">
        <PageIcon icon={icon} id={params.story} />
      </div>
      <TextEditor
        id={params.story}
        content={content}
        name={name}
        updated={parseFloat(updatedAt as string)}
      />
    </div>
  );
}

export default page;
