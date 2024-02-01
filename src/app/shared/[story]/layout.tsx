import { db } from '@/src/db';
import { pages } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { Metadata } from 'next';

type Props = {
  params: { story: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await db
    .select()
    .from(pages)
    .where(eq(pages.shared_link, params.story));

  console.log(data[0], params.story, 'this is data');

  return {
    title: data[0]?.name || 'Page title',
  };
}

export const SharedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="">{children}</div>;
};

export default SharedLayout;
