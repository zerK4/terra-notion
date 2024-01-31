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
      sharedLink: pages.shared_link,
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
      sharedLink: null,
    };
  }

  const { content, name, updatedAt, coverImage, icon, sharedLink } = story[0];

  return {
    content,
    name,
    updatedAt,
    coverImage,
    icon,
    sharedLink,
  };
};

async function page({ params }: { params: { story: string } }) {
  const { content, name, updatedAt, coverImage, icon, sharedLink } =
    await getStories(params);

  return (
    <div className="flex items-center flex-col">
      <CoverImage
        name={name}
        coverImage={coverImage}
        id={params.story}
        icon={icon}
      />
      {icon !== null && (
        <div className="relative md:px-8 -translate-y-16 w-[90vw] h-6 md:w-[60vw]">
          <PageIcon icon={icon} id={params.story as string} />
        </div>
      )}
      <TextEditor
        sharedLink={sharedLink}
        id={params.story}
        content={content}
        name={name}
        updated={parseFloat(updatedAt as string)}
      />
    </div>
  );
}

export default page;
