import React from 'react';

import { Card } from 'antd';
import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button } from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './feature-section.style';

type FeatureSectionProps = PageProps & {
  //
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const features = [
    { title: 'Feature One', description: 'Amazing feature that solves problems.' },
    { title: 'Feature Two', description: 'Another feature that you will love.' },
    { title: 'Feature Three', description: 'Enhance your experience with this one.' },
  ];

  return (
    <S.Features>
      {features.map((feature, index) => (
        <Card key={index} title={feature.title} bordered={true}>
          <p>{feature.description}</p>
        </Card>
      ))}
    </S.Features>
  );
};

export default FeatureSection;
