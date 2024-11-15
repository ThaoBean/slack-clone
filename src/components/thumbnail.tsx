/* eslint-disable @next/next/no-img-element */

import { Dialog, DialogTrigger, DialogContent } from "./ui";

interface ThumbnailProps {
  url?: string | null;
}

export const Thumbnail = ({
  url = "https://cms.interiorcompany.com/wp-content/uploads/2024/01/calendula-attractive-flower-images.jpg",
}: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className='relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in'>
          <img
            src={url}
            alt='Message image'
            className='rounded-md object-cover size-full'
          />
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[800px] border-none bg-transparent p-0 shadow-none'>
        <img
          src={url}
          alt='Message image'
          className='rounded-md object-cover size-full'
        />
      </DialogContent>
    </Dialog>
  );
};
