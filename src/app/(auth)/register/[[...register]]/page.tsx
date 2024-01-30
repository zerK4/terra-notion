import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import React from 'react';

function page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}

export default page;
