import { ButtonProps } from '@oxygen/ui-kit';

import * as S from './export-button.style';

const availableIcons = {
  pdf: <S.PdfIcon className='icon-pdf' />,
  excel: <S.ExcelIcon className='icon-excel' />,
};

export type Props = {
  iconName: keyof typeof availableIcons;
} & ButtonProps;

const ExportButton = ({ iconName, ...restOfProps }: Props) => {
  const buttonProps = { ...{ variant: 'outlined' as const, fullWidth: true }, ...restOfProps };

  return <S.Button {...buttonProps}>{availableIcons[iconName]}</S.Button>;
};

export default ExportButton;
