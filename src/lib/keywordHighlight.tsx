import { Text } from "slate";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import type { NodeEntry } from "slate";
import type { KeywordRange } from "./types";
import type { SlateEditor } from "@udecode/plate-core";
import type { RenderLeafProps } from "@udecode/plate-core";

const keywordRegex = /\b(happy|sad)\b/gi;

// Extract ranges of keywords
export function decorateKeywords({
  entry,
}: {
  editor: SlateEditor;
  entry: NodeEntry;
}): KeywordRange[] {
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
}

// Apply styles to extracted ranges of keywords
export function renderKeywordLeaf(props: RenderLeafProps) {
  const { attributes, children, leaf } = props;
  if (leaf.keyword) {
    const isHappy = leaf.keyword === "happy";
    return (
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>
          <mark
            {...attributes}
            className={
              isHappy
                ? "bg-yellow-200 px-1 rounded"
                : "bg-blue-200 px-1 rounded"
            }
          >
            {children}
          </mark>
        </HoverCardTrigger>
        <HoverCardContent className="p-2 text-sm">
          {isHappy
            ? "Wooooo you're on a roll!"
            : "Today wasn't the best day, but that doesn't mean tomorrow also has to be!"}
        </HoverCardContent>
      </HoverCard>
    );
  }
  return <span {...attributes}>{children}</span>;
}
