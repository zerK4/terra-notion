'use client';

import { Editor } from 'novel';
export default function TextEditor() {
  return (
    <div className="w-[100vw] md:w-[60vw]">
      <Editor className="rounded-none" />
    </div>
  );
}
