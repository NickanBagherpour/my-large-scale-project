import { TagProps as AntChipProps, Tooltip } from 'antd';

import * as S from './chip.style';

type BaseChipProps = AntChipProps & {
  type?: 'active' | 'unActive';
  iconProp?: string;
  ellipsis?: boolean;
};

type ChipPropsWithTooltip = BaseChipProps & { tooltipOnEllipsis: true; tooltipTitle: string };
type ChipPropsWithoutTooltip = BaseChipProps & { tooltipOnEllipsis?: false; tooltipTitle?: string };

export type ChipProps = ChipPropsWithTooltip | ChipPropsWithoutTooltip;

export const Chip = (props: ChipProps) => {
  const {
    tooltipTitle = '',
    ellipsis = false,
    tooltipOnEllipsis = false,
    children,
    iconProp,
    type = 'unActive',
    ...rest
  } = props;

  const isLongLabel = tooltipTitle.length > 31;

  const renderChip = (_ellipsis = true) => {
    return (
      <S.StyledChip $iconProp={iconProp} type={type} {...rest}>
        {type === 'active' && iconProp && <i className={iconProp} />}
        <S.ChipContainer ellipsis={String(_ellipsis)}>{children}</S.ChipContainer>
      </S.StyledChip>
    );
  };

  if (tooltipOnEllipsis && isLongLabel) {
    return (
      <Tooltip title={tooltipTitle} arrow={true}>
        {renderChip(true)}
      </Tooltip>
    );
  } else {
    return renderChip(ellipsis);
  }
};
