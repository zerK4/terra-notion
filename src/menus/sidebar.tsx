import { PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createStory } from '../app/actions/storyActions';

export const handleCreate = async (e: any, router?: AppRouterInstance) => {
  const data = await createStory();

  if (data !== undefined && data?.id !== null) {
    router?.push(data.id);
  }
};

export const sidebarMenu = [
  {
    name: 'Search',
    icon: <SearchIcon size={16} />,
    action: (e: any) => console.log(e),
  },
  {
    name: 'Settings',
    icon: <SettingsIcon size={16} />,
    action: (e: any) => console.log(e),
  },
  {
    name: 'New story',
    icon: <PlusIcon size={16} />,
    action: async (e: any, router?: AppRouterInstance) => {
      await handleCreate(e, router);
    },
  },
];
