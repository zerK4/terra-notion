import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

async function Page() {
  return (
    <div className="flex p-0 m-0 w-screen bg-background h-screen justify-center items-center">
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}

export default Page;
