import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ChevronsLeft } from 'lucide-react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { sidebarStore } from '@/src/store/sidebar';

export function UserComponent({ isMobile }: { isMobile: boolean }) {
  const { signOut } = useClerk();
  const { isClosed } = sidebarStore();
  const { user } = useUser();
  const router = useRouter();
  return (
    <DropdownMenu>
      <div className="flex items-center w-full justify-between">
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => sidebarStore.setState({ isClosed: false })}
            className="border-none text-foreground outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none hover:bg-accent w-full flex justify-start"
          >
            <span className="text-foreground">{user?.firstName}</span>
          </Button>
        </DropdownMenuTrigger>
        {!isClosed && (
          <button
            onClick={() =>
              sidebarStore.setState({
                isClosed: !isClosed,
              })
            }
            className="h-10 w-10 hover:bg-accent flex items-center justify-center"
          >
            <ChevronsLeft />
          </button>
        )}
      </div>
      <DropdownMenuContent className="w-[20rem] bg-primary border-accent ml-4 z-[99999] shadow-md shadow-secondary">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut(() => router.push('/'))}
          className="cursor-pointer"
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
