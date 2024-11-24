import { Meta, StoryFn } from '@storybook/react';
import { Input, InputProps } from './input';

const meta = {
  title: 'UI-Kit/Input',
  component: Input,
  argTypes: {
    allow: {
      options: ['all', 'number', 'letter'],
      control: {
        type: 'radio',
      },
      description: 'Defines the allowed input type. Choose from all, number, or letter.',
      defaultValue: 'all',
    },
    size: {
      options: ['small', 'middle', 'large'],
      control: {
        type: 'radio',
      },
      description: 'Defines the size of the input field.',
      defaultValue: 'large',
    },
    maxLength: {
      control: {
        type: 'number',
      },
      description: 'Specifies the maximum length of the input.',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Placeholder text for the input field.',
    },
    onChange: {
      action: 'changed',
      description: 'Handles input change events.',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Allowed Types */}
      <div>
        <h3>Allowed Types</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Input allow='all' placeholder='Allow All' />
          <Input allow='number' placeholder='Numbers Only' />
          <Input allow='letter' placeholder='Letters Only' />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Input size='small' placeholder='Small Input' />
          <Input size='middle' placeholder='Middle Input' />
          <Input size='large' placeholder='Large Input' />
        </div>
      </div>

      {/* Max Length */}
      <div>
        <h3>Max Length</h3>
        <Input maxLength={10} placeholder='Max 10 characters' />
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays all allowed types, sizes, and max length variations in one view.',
  },
};
