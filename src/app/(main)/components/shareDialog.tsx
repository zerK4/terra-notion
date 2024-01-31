import React, { ChangeEvent, MouseEvent, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { nanoid } from 'nanoid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { Spinner } from '@/src/components/Spinner';
import { ShareDialogFunctions } from './shareDialogFunctions';

function ShareDialog({
  className,
  pageId,
  pageTitle,
}: {
  className?: string;
  pageId: string;
  pageTitle: string;
}) {
  const [link, setLink] = useState<string>();
  const [id, setId] = useState<string>(nanoid(5).toLowerCase());
  const [loading, setLoading] = useState<boolean>(false);
  const { handleChange, handleCreateLink, setDefault } = ShareDialogFunctions({
    id,
    setLink,
    setLoading,
    setId,
    link,
    pageId,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`px-2 py-0 h-7 ${className}`}>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="border-accent">
        <DialogHeader>
          <DialogTitle>Create a shareable link</DialogTitle>
          <DialogDescription>
            You can share this link with anyone to view this page.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <form className="flex flex-col gap-2">
            <div className="flex items-center gap-1  border border-accent focus:border-foreground/50 movement p-1  rounded-md px-2">
              <Input
                value={link}
                onChange={(e) => handleChange(e)}
                className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none h-fit"
              />
              <span className="flex items-center gap-2">
                <span className="">-</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="underline decoration-dotted">{id}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>We add an id after the link.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mt-4">
                <Button
                  onClick={(e) => handleCreateLink(e)}
                  className="text-background w-fit bg-foreground hover:bg-foreground/50"
                >
                  Save & copy link
                </Button>
                <Button
                  onClick={(e) => setDefault(e, pageTitle as string)}
                  className="text-foreground/30 px-0 py-0 h-fit bg-transparent hover:bg-transparent hover:text-foreground/50"
                  variant={'ghost'}
                >
                  Use page name
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setDefault(e, pageId);
                  }}
                  className="text-foreground/30 px-0 h-fit py-0  bg-transparent hover:bg-transparent hover:text-foreground/50"
                  variant={'ghost'}
                >
                  Use page id
                </Button>
              </div>
              {loading && <Spinner />}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
