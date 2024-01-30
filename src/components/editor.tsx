'use client';

import { Editor } from 'novel';
import { useEffect, useRef } from 'react';
import { Editor as EditorType } from '@tiptap/core';
import { editorStore } from '../store/editor';
import { updatePage } from '../app/actions/storyActions';
export default function TextEditor({
  content,
  name,
  id,
  updated,
}: {
  content: any;
  name: string;
  id: string;
  updated: number;
}) {
  const justSave = useRef<NodeJS.Timeout>();
  const { autoSave, saveDate, saved, isSaving } = editorStore();

  useEffect(() => {
    editorStore.setState({ saveDate: updated });
  }, [updated]);

  const handleSaving = async (e?: EditorType) => {
    if (autoSave) {
      if (justSave.current) {
        clearTimeout(justSave.current);
      }
      editorStore.setState({
        saveDate: Date.now(),
      });
      editorStore.setState({ isSaving: true });
      justSave.current = setTimeout(async () => {
        clearTimeout(justSave.current);
        editorStore.setState({
          isSaving: false,
          saved: true,
        });
        setTimeout(async () => {
          await updatePage(
            JSON.stringify({
              path: id,
              pageId: id,
              pageTitle: e!.getJSON().content![0].content![0].text as string,
              json: e?.getJSON(),
            })
          );
        }, 0);
      }, 2000);
    }
  };
  const handleUpdate = (e?: EditorType) => {
    if (e?.getJSON().content![0].type !== 'heading') {
      e
        ?.chain()
        .insertContentAt(0, {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'This is a page title',
            },
          ],
        })
        .run();
    }

    handleSaving(e);
  };

  return (
    <div className="w-[100vw] md:w-[60vw]">
      <Editor
        onUpdate={(e) => handleUpdate(e)}
        disableLocalStorage
        defaultValue={content}
        className="rounded-none"
      />
    </div>
  );
}
