import { ReactNode } from 'react';
import { Tooltip } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';

import * as S from './form-section.style';

type FormSectionPropType = {
  title: string;
  tooltip?: string;
  children: ReactNode;
};
export const FormSection = ({ title, tooltip, children }: FormSectionPropType) => {
  const theme = useAppTheme();
  const [t] = useTr();

  return (
    <>
      <S.TitleContainer>
        <S.TitleText>{t(title)}</S.TitleText>
        {tooltip && (
          <Tooltip color={theme.primary.main} title={t(tooltip)}>
            <S.Icon className={'icon-info-circle'} />
          </Tooltip>
        )}
      </S.TitleContainer>
      <S.Card>{children}</S.Card>
    </>
  );
};
