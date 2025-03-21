# React Timeline Editor
[![npm version](https://img.shields.io/npm/v/@mfoulks3200/react-timeline-editor.svg?style=flat-square)](https://www.npmjs.com/package/@mfoulks3200/react-timeline-editor)
[![npm downloads](https://img.shields.io/npm/dm/@mfoulks3200/react-timeline-editor.svg?style=flat-square)](https://www.npmjs.com/package/@mfoulks3200/react-timeline-editor)

**[React Timeline Editor](https://react-timeline-editor-docs.vercel.app/)** is a react component used to quickly build a timeline animation editor.

![example](https://github.com/mfoulks3200/react-timeline-editor/blob/f79d85eee8a723e5210c04232daf2c51888418c0/public/assets/timeline.gif)
## Getting Started

```bash
npm install @xzdarcy/react-timeline-editor
```

```ts
import { Timeline, TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor';
import React from 'react';

const mockData: TimelineRow[] = [{
    id: "0",
    actions: [
      {
        id: "action00",
        start: 0,
        end: 2,
        effectId: "effect0",
      },
    ],
  },
  {
    id: "1",
    actions: [
      {
        id: "action10",
        start: 1.5,
        end: 5,
        effectId: "effect1",
      }
    ],
}]

const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: "effect0",
    name: "效果0",
  },
  effect1: {
    id: "effect1",
    name: "效果1",
  },
};

const TimelineEditor = () => {
  return (
      <Timeline
        editorData={mockData}
        effects={mockEffect}
      />
  );
};
```

## Documention
Checkout the [Docs](https://react-timeline-editor-docs.vercel.app/) for a demonstration of some basic and advanced features.

## Attribution
This project is a fork of the awesome original package [@xzdarcy/react-timeline-editor](https://github.com/xzdarcy/react-timeline-editor).