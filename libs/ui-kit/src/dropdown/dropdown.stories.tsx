import { Meta, StoryFn } from '@storybook/react';
import { Dropdown, DropdownProps } from './dropdown';

const meta = {
  title: 'UI-Kit/Dropdown',
  component: Dropdown,
  argTypes: {
    trigger: {
      options: ['click', 'hover', 'contextMenu'],
      control: {
        type: 'inline-check',
      },
      description: 'Defines the trigger behavior for the dropdown.',
      defaultValue: ['hover'],
    },
    placement: {
      options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
      control: {
        type: 'select',
      },
      description: 'Specifies the placement of the dropdown menu.',
      defaultValue: 'bottomLeft',
    },
    overlay: {
      control: {
        type: 'text',
      },
      description: 'The dropdown menu content.',
      defaultValue: 'content',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disables the dropdown when set to true.',
    },
    onVisibleChange: {
      action: 'visibility-changed',
      description: 'Triggered when the visibility of the dropdown menu changes.',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<DropdownProps> = (args) => (
  <Dropdown {...args}>
    <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
      Hover or Click Me
    </a>
  </Dropdown>
);

// Base Story
export const Default = Template.bind({});
Default.args = {
  overlay: <div style={{ padding: '1rem' }}>Dropdown Content</div>,
  trigger: ['hover'],
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Trigger Options */}
      <div>
        <h3>Trigger Options</h3>
        <Dropdown overlay={<div style={{ padding: '1rem' }}>Hover Content</div>} trigger={['hover']}>
          <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
            Hover Trigger
          </a>
        </Dropdown>
        <Dropdown overlay={<div style={{ padding: '1rem' }}>Click Content</div>} trigger={['click']}>
          <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
            Click Trigger
          </a>
        </Dropdown>
        <Dropdown overlay={<div style={{ padding: '1rem' }}>Context Menu Content</div>} trigger={['contextMenu']}>
          <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
            Context Menu Trigger
          </a>
        </Dropdown>
      </div>

      {/* Placement Options */}
      <div>
        <h3>Placement Options</h3>
        <Dropdown overlay={<div style={{ padding: '1rem' }}>Top Left</div>} placement='topLeft'>
          <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
            Top Left
          </a>
        </Dropdown>
        <Dropdown overlay={<div style={{ padding: '1rem' }}>Bottom Center</div>} placement='bottomCenter'>
          <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
            Bottom Center
          </a>
        </Dropdown>
        <Dropdown overlay={<div style={{ padding: '1rem' }}>Bottom Right</div>} placement='bottomRight'>
          <a href='#' style={{ padding: '0.5rem', display: 'inline-block' }}>
            Bottom Right
          </a>
        </Dropdown>
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Demonstrates all variations of trigger options and placement configurations.',
  },
};
