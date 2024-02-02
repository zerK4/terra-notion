'use client';

import { TrashIcon, UploadCloudIcon } from 'lucide-react';
import Image from 'next/image';
import { uploadFiles } from '@/src/app/actions/uploadActions';
import { useEffect, useState } from 'react';
import { Spinner } from '@/src/components/Spinner';
import { remove } from '../app/actions/storyActions';
import { useAuthStore } from '../store/auth';

function CoverImage({
  name,
  coverImage,
  id,
  icon,
}: {
  name: string | null;
  coverImage: string | null;
  id: string | null;
  icon: any;
}) {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthStore();

  useEffect(() => {
    setImg(coverImage);
    setLoading(false);
  }, [name, coverImage]);

  const handleUpload = async (e: any) => {
    try {
      setLoading(true);
      const reader = new FileReader();
      const file = e.target.files?.[0];

      const formData = new FormData();
      formData.append('file', file);

      reader.readAsDataURL(e.target.files![0]);
      reader.onload = () => {
        setImg(reader.result as string);
      };

      uploadFiles(formData, name!, user?.name as string, id!);
    } catch (err: any) {
      console.log(err.message, 'error here');
    }
  };

  const handleRemoveCover = async () => {
    setLoading(true);
    setImg(null);
    await remove({ pageId: id!, what: 'cover_image' });
    setLoading(false);
  };

  return (
    <div className="group/cover relative w-full bg-transparent flex items-center justify-end -z-0 min-h-[7rem]">
      {img !== null && (
        <div className="h-[30vh] w-full relative">
          <Image
            src={img}
            alt={name!}
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
      )}
      <div className="w-full bottom-2 left-0 absolute ease-in-out duration-300 flex items-center justify-end gap-4 px-4 pl-40">
        <label
          htmlFor="dropzone-file"
          className="bg-background/50 z-50 group-hover/cover:opacity-100 opacity-0 hover:bg-background/100 ease-in-out duration-300 cursor-pointer py-2 px-2 rounded-md text-foreground/50 whitespace-nowrap"
        >
          <div className="flex items-center gap-2">
            <UploadCloudIcon size={16} />
            <span className="hidden md:flex">
              {coverImage === null ? 'Upload cover' : 'Change cover'}
            </span>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            name="file"
            onChange={(e) => handleUpload(e)}
          />
        </label>
        {img !== null && (
          <button
            onClick={() => handleRemoveCover()}
            className="flex group-hover/cover:opacity-100 opacity-0 items-center gap-1 bg-background/50 z-50 hover:bg-background/100 ease-in-out duration-300 cursor-pointer py-2 px-2 rounded-md text-foreground/50 whitespace-nowrap"
          >
            <span className="">
              <TrashIcon size={16} />
            </span>
            <span className="hidden md:flex">Remove cover</span>
          </button>
        )}
      </div>
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center">
          <Spinner size={'lg'} />
        </div>
      )}
    </div>
  );
}

export default CoverImage;
