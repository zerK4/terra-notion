import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { dark } from '@clerk/themes';

function page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}

export default page;
