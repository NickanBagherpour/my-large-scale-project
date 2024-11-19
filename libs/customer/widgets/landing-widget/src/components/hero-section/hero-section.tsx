import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './hero-section.style';
import { Button } from '@oxygen/ui-kit';

type HeroSectionProps = PageProps & {
  //
};

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  return (
    <S.Hero>
      <h1>Welcome to My Landing Page</h1>
      <p>Your one-stop solution for awesome services.</p>
      <Button color='secondary' size='large'>
        {t('button.login_register')}
      </Button>
    </S.Hero>
  );
};

export default HeroSection;
