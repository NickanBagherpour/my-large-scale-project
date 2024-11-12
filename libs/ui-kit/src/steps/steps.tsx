'use client';

import { Steps as AntSteps, StepsProps as AntStepsProps, Progress } from 'antd';
import * as S from './steps.style';

export type StepsProps = AntStepsProps & {
  disabled?: boolean;
};

export const Steps = (props: StepsProps) => {
  const { items = [], type = 'navigation', size = 'small', disabled = true, ...rest } = props;

  const minPercent = 10;

  return (
    <S.StepsWrapper>
      <AntSteps type={type} size={size} {...rest}>
        {items.map((step, index) => {
          const progressPercent = minPercent + (index / (items.length - 1)) * (100 - minPercent);

          return (
            <AntSteps.Step
              disabled={disabled}
              key={index}
              title={<strong>{`${index + 1}. ${step.title}`}</strong>}
              icon={<Progress percent={progressPercent} showInfo={false} strokeWidth={10} type='circle' size={20} />}
            />
          );
        })}
      </AntSteps>
    </S.StepsWrapper>
  );
};
