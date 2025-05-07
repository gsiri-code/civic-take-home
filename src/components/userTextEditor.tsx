"use client";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";

import type { SlateEditor } from "@udecode/plate-core";
import { Plate, usePlateEditor } from "@udecode/plate/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";

import { Text } from "slate";
import type { NodeEntry, Range } from "slate";
import React, { useCallback, useState } from "react";

interface KeywordRange extends Range {
  keyword: string;
}

const keywordRegex = /\b(happy|sad)\b/gi;

export default function UserTextEditor() {
  const [value, setValue] = useState([{ type: "p", children: [{ text: "" }] }]);

  // Extract ranges of keywords
  const decorate = useCallback(
    ({ entry }: { editor: SlateEditor; entry: NodeEntry }): KeywordRange[] => {
      const [node, path] = entry;
      const ranges: KeywordRange[] = [];

      if (Text.isText(node)) {
        let match: RegExpExecArray | null;
        while ((match = keywordRegex.exec(node.text)) !== null) {
          const word = match[0];
          const start = match.index;

          ranges.push({
            anchor: { path, offset: start },
            focus: { path, offset: start + word.length },
            keyword: word.toLowerCase(),
          });
        }
      }
      return ranges;
    },
    [],
  );

  const components = { [HighlightPlugin.key]: HighlightLeaf };
  const editor = usePlateEditor({
    value,
    plugins: [HighlightPlugin],
    components: components,
  });
  return (
    <Plate onChange={({ value }) => setValue(value)} editor={editor}>
      <EditorContainer>
        <Editor placeholder="Type..." decorate={decorate} />
      </EditorContainer>
    </Plate>
  );
}
