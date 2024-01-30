'use client';

import { UploadCloudIcon } from 'lucide-react';
import Image from 'next/image';
import { uploadFiles } from '@/src/app/actions/uploadActions';
import { useEffect, useState } from 'react';
import { Spinner } from '@/src/components/Spinner';
import { useUser } from '@clerk/clerk-react';

function CoverImage({
  name,
  coverImage,
  id,
}: {
  name: string | null;
  coverImage: string | null;
  id: string | null;
}) {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

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

      uploadFiles(formData, name!, user?.lastName as string, id!);
    } catch (err: any) {
      console.log(err.message, 'error here');
    }
  };

  return (
    <div className="group/cover relative w-full bg-primary flex items-center justify-end -z-0">
      <div className="h-[25vh] w-full relative">
        {img !== null && (
          <Image
            src={img}
            alt={name!}
            layout="fill"
            objectFit="cover"
            className=""
          />
        )}
      </div>
      <label
        htmlFor="dropzone-file"
        className="bg-primary/50 group-hover/cover:opacity-100 opacity-0 hover:bg-primary/70 ease-in-out duration-300 bottom-2 right-2 absolute cursor-pointer py-1 px-2 rounded-md"
      >
        <div className="flex items-center gap-2">
          <UploadCloudIcon />
          Change cover
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          name="file"
          onChange={(e) => handleUpload(e)}
        />
      </label>
      {loading && <Spinner size={'lg'} />}
    </div>
  );
}

export default CoverImage;
