// Steps.stories.tsx

import React, { useState } from 'react';
import { Steps } from './steps';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Components/Steps',
  component: Steps,
} as Meta;

const Template: Story = (args) => {
  const [currentStep, setCurrentStep] = useState(0); // State for tracking current step

  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
  };

  return (
    <>
      <Steps {...args} current={currentStep} onChange={handleStepChange} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}>Previous</button>
        <button onClick={() => setCurrentStep((prev) => Math.min(prev + 1, args.items.length - 1))}>Next</button>
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }],
};

export const Disabled = Template.bind({});
Disabled.args = {
  items: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }],
  disabled: true,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  items: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }],
  size: 'large',
};

// Example of different colors and icons
export const CustomProgressAndIcons = Template.bind({});
CustomProgressAndIcons.args = {
  items: [
    { title: 'Custom Step A' },
    { title: 'Custom Step B' },
    { title: 'Custom Step C' },
    // You can add more steps with different titles or icons here
  ],
};
