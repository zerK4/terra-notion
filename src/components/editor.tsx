'use client';

import { Editor } from 'novel';
import { useEffect, useRef } from 'react';
import { Editor as EditorType } from '@tiptap/core';
import { editorStore } from '../store/editor';
import { updatePage } from '../app/actions/storyActions';
import { pageStore } from '../store/page';
import { generalStore } from '../store/general';
export default function TextEditor({
  content,
  name,
  id,
  updated,
  sharedLink,
  editable,
}: {
  content: any;
  name: string;
  id: string;
  updated: number;
  sharedLink: string | null;
  editable: boolean;
}) {
  const justSave = useRef<NodeJS.Timeout>();
  const { autoSave } = editorStore();

  useEffect(() => {
    editorStore.setState({ saveDate: updated });
    pageStore.setState({ pageName: name, pageId: id, sharedLink: sharedLink });
    generalStore.setState({loading: false})
  }, [updated, name, id, sharedLink]);

  const handleSaving = async (e?: EditorType) => {
    if (!editable) {
      return;
    }
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
              pageTitle: e!.getJSON().content![0]?.content![0]?.text || '',
              json: e?.getJSON(),
            })
          );
        }, 0);
      }, 500);
    }
  };
  const handleUpdate = (e?: EditorType) => {
    if (!editable) {
      return;
    }
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
        editorProps={{
          editable: () => editable,
        }}
        onUpdate={(e) => handleUpdate(e as any)}
        disableLocalStorage
        defaultValue={content}
        className="rounded-none"
      />
    </div>
  );
}
