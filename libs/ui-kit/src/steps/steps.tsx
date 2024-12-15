'use client';

import { Steps as AntSteps, StepsProps as AntStepsProps, Progress } from 'antd';
import * as S from './steps.style';
import { useState } from 'react';

export type StepsProps = AntStepsProps & {
  disabled?: boolean;
  current?: number; // Add current prop
  onChange?: (current: number) => void; // Add onChange prop
};

export const Steps = (props: StepsProps) => {
  const { items = [], type = 'navigation', size = 'small', disabled = true, current = 0, onChange, ...rest } = props;

  const minPercent = 10;

  return (
    <S.StepsWrapper>
      <AntSteps type={type} size={size} current={current} {...rest}>
        {items.map((step, index) => {
          const progressPercent = minPercent + (index / (items.length - 1)) * (100 - minPercent);

          return (
            <AntSteps.Step
              disabled={disabled}
              key={index}
              title={
                <strong
                  onClick={() => onChange && onChange(index)} // Handle click to change step
                  style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} // Change cursor based on disabled state
                >
                  {`${index + 1}. ${step.title}`}
                </strong>
              }
              icon={<Progress percent={progressPercent} showInfo={false} strokeWidth={10} type='circle' size={20} />}
              status={step.status}
            />
          );
        })}
      </AntSteps>
    </S.StepsWrapper>
  );
};
