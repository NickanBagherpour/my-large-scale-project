import { Meta, StoryFn } from '@storybook/react';
import { InputMoney, InputMoneyProps } from './input-money';

const meta = {
  title: 'UI-Kit/InputMoney',
  component: InputMoney,
  argTypes: {
    showLetter: {
      control: 'boolean',
      description: 'Displays the monetary value in words.',
      defaultValue: true,
    },
    subtitle: {
      control: 'text',
      description: 'Additional subtitle displayed below the input.',
    },
    value: {
      control: 'text',
      description: 'The initial value of the input.',
    },
    allowClear: {
      control: 'boolean',
      description: 'Allows clearing the input field.',
      defaultValue: true,
    },
    maxLength: {
      control: {
        type: 'number',
      },
      description: 'Specifies the maximum length of the input.',
      defaultValue: 19,
    },
    onValue: {
      action: 'valueChanged',
      description: 'Triggered when the value or formatted value changes.',
    },
  },
} satisfies Meta<typeof InputMoney>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<InputMoneyProps> = (args) => <InputMoney {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  value: '123456',
  showLetter: true,
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Basic Configuration */}
      <div>
        <h3>Basic Configuration</h3>
        <InputMoney value="12345" showLetter={true} subtitle="Amount in Toman" />
      </div>

      {/* Max Length */}
      <div>
        <h3>Max Length</h3>
        <InputMoney maxLength={10} value="123456789012" />
      </div>

      {/* With Subtitle */}
      <div>
        <h3>With Custom Subtitle</h3>
        <InputMoney value="500000" subtitle="Custom subtitle here" />
      </div>

      {/* Without Letter Display */}
      <div>
        <h3>Without Letter Display</h3>
        <InputMoney value="100000" showLetter={false} />
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays various configurations of the InputMoney component, including max length, subtitles, and letter display options.',
  },
};
