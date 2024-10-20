import { TabsProps as AntTabProps } from 'antd';
import { StyledTabs } from './tabs.style';

export type TabsProps = AntTabProps & {
  //
};

export const Tabs = (props: TabsProps) => {
  const { children, ...rest } = props;

  return <StyledTabs {...rest}>{children}</StyledTabs>;
};
