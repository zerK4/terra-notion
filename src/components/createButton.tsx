'use client';

import React from 'react';
import { Button } from './ui/button';
import { createStory } from '../app/actions/storyActions';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CreateButton() {
  const router = useRouter();
  const handleCreate = async (e: any) => {
    const data = await createStory();

    if (data !== undefined && data?.id !== null) {
      router?.push(data.id);
    }
  };

  return (
    <Button
      onClick={(e) => handleCreate(e)}
      className="text-foreground border border-accent"
    >
      <PlusCircle className="h-4 w-4 mr-2 text-foreground" />
      Create a note
    </Button>
  );
}

export default CreateButton;
