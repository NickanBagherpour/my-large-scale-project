'use client';

import React from 'react';

import { Steps as AntSteps, StepsProps as AntStepsProps, Progress } from 'antd';

import { useAppTheme } from '@oxygen/hooks';

import * as S from './steps.style';

export type StepsProps = AntStepsProps & {
  //
};

export const Steps = (props: StepsProps) => {
  const { items = [], type = 'navigation', size = 'small', ...rest } = props;

  const theme = useAppTheme();

  return (
    <S.StepsWrapper>
      <AntSteps type={type} size={size} {...rest}>
        {items.map((step, index) => (
          <AntSteps.Step
            key={index}
            title={<strong>{`${index + 1}. ${step.title}`}</strong>}
            // subTitle={<div style={{ fontStyle: 'italic' }}>{step.subTitle}</div>}
            // description={<div>{/**/}</div>}
            icon={
              <Progress
                percent={(index / (items.length - 1)) * 100}
                showInfo={false}
                strokeWidth={10}
                type='circle'
                size={20}
                trailColor={theme.secondary._200}
                strokeColor={theme.secondary.main}
              />
            }
          />
        ))}
      </AntSteps>
    </S.StepsWrapper>
  );
};

// export const Steps = (props: StepsProps) => {
//   const { children, ...rest } = props;

//   return (
//     <S.StepsWrapper>
//       <AntSteps {...rest}>{children} </AntSteps>
//     </S.StepsWrapper>
//   );
// };
