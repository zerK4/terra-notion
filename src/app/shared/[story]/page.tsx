import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import React from 'react';
import TextEditor from '@/src/components/editor';

async function page({ params }: { params: { story: string } }) {
  const page = await db
    .select()
    .from(pages)
    .where(eq(pages.shared_link, params.story));

  if (page?.length === 0) {
    return;
  }

  console.log(page[0]);

  return (
    <div className="w-full mb-10">
      <div className="relative movement">
        <div className="h-[25vh] group/cover relative w-full bg-primary flex items-center justify-center -z-0">
          {page[0].cover_image !== null && (
            <Image
              src={page[0].cover_image}
              alt="Something"
              className="object-cover"
              fill
              priority
            />
          )}
        </div>
        <div className="absolute -bottom-9 right-10">
          <div className="relative md:px-8 -translate-y-16 w-[85vw] h-6 md:w-[80vw] text-[5rem]">
            {page[0].icon}
          </div>
        </div>
      </div>
      <div className="flex justify-center  px-2">
        <TextEditor
          editable={false}
          sharedLink={page[0].shared_link}
          id={params.story}
          content={page[0].json}
          name={page[0].name}
          updated={parseFloat(page[0].updated_at as string)}
        />
      </div>
    </div>
  );
}

export default page;
