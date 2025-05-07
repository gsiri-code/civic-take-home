"use client";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { decorateKeywords, renderKeywordLeaf } from "@/lib/keywordHighlight";
import { Plate, usePlateEditor } from "@udecode/plate/react";
import React, { useCallback, useState } from "react";

export default function UserTextEditor() {
  const [value, setValue] = useState([{ type: "p", children: [{ text: "" }] }]);

  const decorate = useCallback(decorateKeywords, []);
  const renderLeaf = useCallback(renderKeywordLeaf, []);

  const editor = usePlateEditor({
    value,
  });
  return (
    <Plate onChange={({ value }) => setValue(value)} editor={editor}>
      <EditorContainer>
        <Editor
          placeholder="Type..."
          decorate={decorate}
          renderLeaf={renderLeaf}
        />
      </EditorContainer>
    </Plate>
  );
}
