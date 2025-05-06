'use client';
import { withProps } from '@udecode/cn';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';

import React from 'react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';

import { Plate,
  PlateElement,
  PlateLeaf,
  usePlateEditor
} from '@udecode/plate/react';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { HighlightPlugin } from '@udecode/plate-highlight/react';


export default function BasicEditorStylingDemo() {
  const value = [
    {
      type: 'p',
      children: [
        {
          text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
        },
      ],
    },
  ];
  const components =  {
        bold: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className:
            'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
        }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        p: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
        highlight: withProps(HighlightLeaf,{as:'mark'}),
  }


  const editor = usePlateEditor({
    value:value,
    plugins: [
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      HighlightPlugin
    ],
    components:components
  });
  return (
    <Plate editor={editor}      onChange={({ value }) => {
      localStorage.setItem('editorContent', JSON.stringify(value));
    }}>
      <EditorContainer>
        <Editor placeholder="Type..." />
      </EditorContainer>
    </Plate>
  );
}
