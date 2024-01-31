'use client';

import { Editor } from 'novel';

const SharedTiptap = ({ json }: { json: any }) => {
  console.log(json, 'the json');
  return (
    <div className="w-full md:w-[50vw] lg:w-[70vh] mt-10">
      <Editor
        defaultValue={json}
        editorProps={{
          editable: () => false,
        }}
      />
    </div>
  );
};

export default SharedTiptap;
