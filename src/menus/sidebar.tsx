import { PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createStory } from '../app/actions/storyActions';
import { generalStore } from '../store/general';
import { Spinner } from '../components/Spinner';
import SearchComponent from '../app/(main)/components/searchComponent';
import { useRouter } from 'next/navigation';
import SettingsMenu from '../app/(main)/components/settingsMenu';

export const NewStory = () => {
  const router = useRouter();
  const { loading } = generalStore();

  return (
    <button
      onClick={() => {
        handleCreate(router);
        generalStore.setState({
          loading: true,
        });
      }}
      className="p-1 px-4 hover:bg-accent ease-in-out duration-300 w-full text-start flex items-center justify-between rounded-md"
    >
      <div className="flex items-center gap-2">
        <span className="">
          <PlusIcon size={16} />
        </span>
        <span className="">New story</span>
      </div>
      {loading && <Spinner />}
    </button>
  );
};

export const handleCreate = async (router?: AppRouterInstance) => {
  const data = await createStory();

  if (data !== undefined && data?.id !== null) {
    router?.push(data.id);
  }
};

export const sidebarMenu = [
  {
    name: 'Search',
    icon: <SearchIcon size={16} />,
    controller: <SearchComponent />,
    action: (e: any) => console.log(e),
  },
  {
    name: 'Settings',
    icon: <SettingsIcon size={16} />,
    controller: <SettingsMenu />,
    action: (e: any) => console.log(e),
  },
  {
    name: 'New story',
    icon: <PlusIcon size={16} />,
    controller: <NewStory />,
  },
];
