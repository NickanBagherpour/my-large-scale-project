import { SwitchProps as AntSwitchProps } from 'antd';
import { StyledSwitch } from './switch.style';

export type SwitchProps = AntSwitchProps & {
  //
  notAllowed?: boolean;
};

export const Switch = (props: SwitchProps) => {
  const { ...rest } = props;

  return <StyledSwitch {...rest} />;
};
