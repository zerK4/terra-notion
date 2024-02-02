import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/src/components/theme-provider';
import { Toaster } from '../components/ui/sonner';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { ThemeToggle } from '../components/theme-toggle';
import Dummy from './(main)/components/dummy';
import { getSession } from './actions/authActions';

export const metadata: Metadata = {
  title: 'Terra application',
  description: 'A notion like application.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getSession();

  if (user === null) {
    return (
      <html suppressHydrationWarning={true} lang="en" className="dark-theme">
        <body className="overflow-x-hidden" suppressHydrationWarning={true}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-secondary min-h-screen">{children}</div>
            <Toaster position="top-right" />
            <ThemeToggle />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  const [currentUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id));

  console.log(currentUser, 'the user');

  return (
    <html suppressHydrationWarning={true} lang="en" className="dark-theme">
      <body className="overflow-x-hidden" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {currentUser && <Dummy user={currentUser} />}
          <div className="bg-secondary min-h-screen">{children}</div>
          <Toaster position="top-right" />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
