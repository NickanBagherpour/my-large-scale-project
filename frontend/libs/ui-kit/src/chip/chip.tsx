import { TagProps as AntChipProps } from 'antd';
import { StyledChip } from './chip.style';

export type ChipProps = AntChipProps & {
  type?: string;
  iconProp?: string;
};

export const Chip = (props: ChipProps) => {
  const { children, iconProp, type = 'unActive', ...rest } = props;

  return (
    <StyledChip type={type} iconProp={iconProp} {...rest}>
      {type === 'active' && iconProp && <i className={iconProp} />}
      {children}
    </StyledChip>
  );
};
