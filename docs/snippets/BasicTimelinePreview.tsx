import React, { useState } from 'react';
import { MockRowData, MockEffectData } from '../../src/mock-data';
import { Timeline } from '../../src/components/timeline';

export const TimelineEditor = () => {
  const [data, setData] = useState(MockRowData);

  return (
    <Timeline
      style={{ width: '100%', height: '100%' }}
      onChange={setData}
      editorData={data}
      effects={MockEffectData}
      hideCursor={false}
      autoScroll={true}
    />
  );
};
