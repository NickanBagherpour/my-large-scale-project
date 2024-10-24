import React from 'react';
import { Steps, Progress } from 'antd';
import { useAppTheme } from '@oxygen/hooks';
import * as S from './page-stepper.style';

const { Step } = Steps;

export type StepItemType = {
  id?: any;
  component?: React.ReactNode;
  title?: string;
  // subTitle?: string;
  // status?: string;
  // description?: string;
  icon?: React.ReactNode;
};

type PageStepperProps = {
  steps?: StepItemType[];
  current?: number;
  onChange?: (current: number) => void;
};

export const PageStepper = ({ steps = [], current = 0, onChange }: PageStepperProps) => {
  const theme = useAppTheme();

  return (
    <S.PageStepperWrapper>
      <Steps type='navigation' size='small' current={current} onChange={onChange} className='site-navigation-steps'>
        {steps.map((step, index) => (
          <Step
            key={step.id}
            title={<strong>{`${index + 1}. ${step.title}`}</strong>}
            // subTitle={<div style={{ fontStyle: 'italic' }}>{step.subTitle}</div>}
            // description={<div>{/**/}</div>}
            icon={
              <Progress
                percent={(index / (steps.length - 1)) * 100}
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
      </Steps>
    </S.PageStepperWrapper>
  );
};
