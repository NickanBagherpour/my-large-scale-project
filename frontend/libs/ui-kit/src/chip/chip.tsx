import { TagProps as AntChipProps } from 'antd';
import { StyledChip } from './chip.style';

export type ChipProps = AntChipProps & {
  active?: boolean;
};

export const Chip = (props: ChipProps) => {
  const { children, icon, active = false, ...rest } = props;
  // debugger;

  return (
    <StyledChip active={active.toString()} {...rest}>
      {children}
    </StyledChip>
  );
};
