import { Meta, StoryFn } from '@storybook/react';
import { DropdownSelect, DropdownSelectProps } from './dropdown-select';

const meta: Meta<typeof DropdownSelect> = {
  title: 'UI-Kit/DropdownSelect',
  component: DropdownSelect,
  argTypes: {
    menu: {
      control: { type: 'object' },
      description: 'Menu items for the dropdown.',
      defaultValue: [
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
      ],
    },
    multiSelect: {
      control: { type: 'boolean' },
      description: 'Enable or disable multi-select.',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner.',
      defaultValue: false,
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['start', 'end'],
      description: 'Position of the icon in the button.',
      defaultValue: 'end',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selected values change.',
    },
  },
};

export default meta;

// Template for stories
const Template: StoryFn<DropdownSelectProps> = (args) => <DropdownSelect {...args}>Select Options</DropdownSelect>;

// Default story
export const Default = Template.bind({});
Default.args = {
  menu: [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ],
  multiSelect: false,
};

// Multi-select story
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  menu: [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ],
  multiSelect: true,
};

// Loading state story
export const Loading = Template.bind({});
Loading.args = {
  menu: [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ],
  loading: true,
};

// Custom icon position
export const IconStart = Template.bind({});
IconStart.args = {
  menu: [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ],
  iconPosition: 'start',
};
