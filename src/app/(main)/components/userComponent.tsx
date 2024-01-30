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

export function UserComponent() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  return (
    <DropdownMenu>
      <div className="flex items-center w-full justify-between">
        <DropdownMenuTrigger asChild>
          <Button className="border-none text-foreground outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none hover:bg-accent w-full flex justify-start">
            {user?.firstName}
          </Button>
        </DropdownMenuTrigger>
        <button className="h-10 w-10 hover:bg-accent flex items-center justify-center">
          <ChevronsLeft />
        </button>
      </div>
      <DropdownMenuContent className="w-[20rem] bg-primary border-accent ml-4">
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
