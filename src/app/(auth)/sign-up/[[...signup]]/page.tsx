import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

async function Page() {
  return (
    <div className="flex p-0 m-0 w-screen bg-background h-screen justify-center items-center">
      <SignUp appearance={{ baseTheme: dark }} afterSignUpUrl={'/onboarding'} />
    </div>
  );
}

export default Page;
