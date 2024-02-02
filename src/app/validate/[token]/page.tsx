'use client';

import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';
import { validate } from '../../actions/authActions';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Spinner } from '@/src/components/Spinner';

function Page({ params }: { params: { token: string } }) {
  console.log(params.token, 'this is the token');

  useEffect(() => {
    validate(params.token);
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
