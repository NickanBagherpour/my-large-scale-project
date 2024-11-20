import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
import HeroSection from '../hero-section/hero-section';
import FeatureSection from '../feature-section/feature-section';

import * as S from './app.style';

type AppProps = PageProps & {
  //
};

const App: React.FC<AppProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  return (
    <S.Layout>
      <S.Content>
        <HeroSection />
        <FeatureSection />
      </S.Content>
    </S.Layout>
  );
};

export default App;
