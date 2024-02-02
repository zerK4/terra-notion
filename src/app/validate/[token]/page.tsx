'use client';

import React, { useEffect } from 'react';
import { validate } from '../../actions/authActions';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Spinner } from '@/src/components/Spinner';
import { getNavStories } from '../../actions/storyActions';
import { useRouter } from 'next/navigation';

function Page({ params }: { params: { token: string } }) {
  const router = useRouter();

  useEffect(() => {
    validate(params.token).then(async (res) => {
      const {stories} = await getNavStories();
      console.log(stories, 'the data')

      if (stories.length > 0) {
        router.push(`/${stories[0].id}`);
      } else {
        router.push('/');
      }
    });
  }, [params.token]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Card className="w-full sm:w-[20rem]">
        <CardHeader className="w-full text-center text-2xl">
          Just a second
        </CardHeader>
        <CardContent className="w-full flex items-center justify-center">
          <Spinner size={'icon'} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
