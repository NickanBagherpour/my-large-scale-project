import { Tooltip } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import * as S from './form-section.style';

export const FormSection = ({ title, tooltip, children }) => {
  const theme = useAppTheme();

  return (
    <>
      <S.TitleContainer>
        <S.TitleText>{title}</S.TitleText>
        {tooltip && (
          <Tooltip color={theme.primary.main} title={tooltip}>
            <S.Icon className={'icon-info-circle'} />
          </Tooltip>
        )}
      </S.TitleContainer>
      <S.Card>{children}</S.Card>
    </>
  );
};
