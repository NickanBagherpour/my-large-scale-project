'use client';

import styled from 'styled-components';
import { Button, Box, Select, PageStepper, InfoBox, Steps } from '@oxygen/ui-kit';
import React from 'react';
import { Progress } from 'antd';
import { ActiveBadge } from 'libs/ui-kit/src/assets';

export type InfoItemType = {
  key: string;
  value: string;
  subValue?: string;
  type?: string;
  roundedText?: boolean;
  startIcon?: React.ReactNode;
  files?: string[];
};
export default function Index() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const onChange = (current) => {
    setCurrentStep(current);
  };

  const steps = [
    {
      title: 'دریافت اطلاعات',
      // subTitle: '00:00:05',
      // description: 'This is a description.',
    },
    {
      title: 'افزودن سرویس',
      // subTitle: '00:01:02',
      // description: 'This is a description.',
    },
    {
      title: 'افزودن پلاگین',
      // subTitle: 'waiting for longlong time',
      // description: 'This is a description.',
    },
    {
      title: 'مدیریت تعرفه',
      // subTitle: 'waiting for longlong time',
      // description: 'This is a description.',
    },
  ];

  const mockData: InfoItemType[] = [
    {
      key: 'UserName',
      value: 'John Doe',
      subValue: 'Administrator',
      type: 'text',
      roundedText: true,
    },
    {
      key: 'Email',
      value: 'john.doe@example.com',
      type: 'text',
      startIcon: <ActiveBadge />,
    },
    {
      key: 'ContactNumber',
      value: '+123 456 7890',
      type: 'text',
      roundedText: true,
    },
    {
      key: 'AccountType',
      value: 'Premium',
      subValue: 'Expires in 30 days',
      type: 'text',
    },
    {
      key: 'AccountType',
      value: 'Premium',
      subValue: 'Expires in 30 days',
      type: 'text',
    },
    {
      key: 'Documents',
      value: '',
      type: 'file',
      files: ['Document1.pdf', 'Document2.pdf'],
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      Hello from dashboard!
      {/* <ActiveBadge /> */}
      <Steps items={steps} current={currentStep} onChange={onChange} />
      infobox ui-kit
      <InfoBox data={mockData} />
    </div>
  );
}
