import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { useAuthStore } from '@/src/store/auth';
import { PersonIcon } from '@radix-ui/react-icons';
import { SettingsIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export const settingsMenu = [
  {
    name: 'Profile',
    icon: <PersonIcon />,
  },
  {
    name: 'Profile',
    icon: <PersonIcon />,
  },
];

function SettingsMenu() {
  const [image, setImage] = useState<any | null>(null);
  const { user } = useAuthStore();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 px-4 hover:bg-accent ease-in-out duration-300 w-full text-start flex items-center gap-2 rounded-md">
          <SettingsIcon size={16} />
          <span className="">Settings</span>
        </button>
      </DialogTrigger>
      <DialogContent className="border border-accent w-full">
        <h3 className="">Hi, {user?.name}</h3>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="account">
              Account
            </TabsTrigger>
            <TabsTrigger className="w-full" value="editor">
              Editor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                className="border-accent"
                value={user?.email}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input
                className=""
                value={user?.name}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Profile image</Label>
              <div className="">
                <Input
                  className=""
                  value={image}
                  type="file"
                  onChange={(e) => console.log(e.target.value)}
                />
                <div className="relative">
                  {image !== null && <Image src={image} alt="Profile" fill />}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="editor">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsMenu;
