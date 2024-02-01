import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/src/components/theme-provider';
import { ClerkProvider, currentUser } from '@clerk/nextjs';
import { Toaster } from '../components/ui/sonner';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { ThemeToggle } from '../components/theme-toggle';

export const metadata: Metadata = {
  title: 'Terra application',
  description: 'A notion like application.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (user !== null) {
    const exists = await db
      .select()
      .from(users)
      .where(eq(users.email, user.emailAddresses[0].emailAddress));

    if (exists.length === 0) {
      await db.insert(users).values({
        email: user.emailAddresses[0].emailAddress,
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
      });
    }
  }
  return (
    <html suppressHydrationWarning={true} lang="en" className="dark-theme">
      <body className="overflow-x-hidden" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <div className="bg-secondary min-h-screen">{children}</div>
            <Toaster position="top-right" />
          </ClerkProvider>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
