import type React from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
// import {dimension} from 'react';

export function ImageModal({
  url,
  alt,
  children,
}: {
  url: string
  alt: string
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex items-center">
        {children}
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <div className="max-h-[80vh] p-2 md:max-w-[70vw] max-w-[85vw] rounded-sm top-0 right-2 mx-auto md:mx-0 mb-4 md:mb-0">
          <img
            src={url}
            alt={alt}
            className="max-w-full rounded-sm max-h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
