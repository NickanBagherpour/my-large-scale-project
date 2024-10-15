'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// adding the `layer` prop so the style of antd will always be lower than the default CSS selector priority
// see: https://ant.design/docs/react/compatible-style#layer
export default function AntStyleProvider(props: Props) {
  const { children } = props;
  return <StyleProvider layer>{children}</StyleProvider>;
}
