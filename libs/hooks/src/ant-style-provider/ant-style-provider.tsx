'use client';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// adding the `layer` prop so the style of antd will always be lower than the default CSS selector priority
// see: https://ant.design/docs/react/compatible-style#layer
export default function AntStyleProvider(props: Props) {
  const { children } = props;

  const cache = createCache();

  useServerInsertedHTML(() => {
    return <style id='antd' dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />;
  });

  return (
    <StyleProvider cache={cache} layer>
      {children}
    </StyleProvider>
  );
}
