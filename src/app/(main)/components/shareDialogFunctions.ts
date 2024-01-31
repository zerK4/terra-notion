import { MouseEvent, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { update } from '../../actions/storyActions';
import { pageStore } from '@/src/store/page';

interface ShareDialogFunctionsProps {
  id?: string;
  setLink?: any;
  setLoading?: any;
  setId?: any;
  link?: string;
  pageId?: string;
}

export const ShareDialogFunctions = ({
  id,
  setLink,
  setLoading,
  setId,
  link,
  pageId,
}: ShareDialogFunctionsProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(
      e.target.value
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '')
    );
  };

  const setDefault = (e: MouseEvent<HTMLElement>, what: string) => {
    e.preventDefault();
    setLink(
      what
        ?.split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '')
    );
  };

  const handleCreateLink = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await update({
        what: 'shared_link',
        id: pageId as string,
        data: `${link}-${id}`,
      });

      navigator.clipboard.writeText(
        `${window.location.origin}/shared/${link}-${id}`
      );
      pageStore.setState({
        sharedLink: `${link}-${id}`,
      });
      toast('Copied to clipboard!', {
        position: 'top-right',
        className: 'bg-purple-400',
      });

      setLink('');
      setId(nanoid(5).toLowerCase());

      return data;
    } catch (error: any) {
      console.log(error.message, 'Error sending the link to the BE');
      toast.error('Error sending the link to the server');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    setDefault,
    handleCreateLink,
  };
};
