import { Meta, StoryFn } from '@storybook/react';
import { Chip, ChipProps } from './chip';

const types = ['active', 'unActive'] satisfies ChipProps['type'][];

const meta = {
  title: 'UI-Kit/Chip',
  component: Chip,
  argTypes: {
    type: {
      options: types,
      control: {
        type: 'radio',
      },
      description: 'Defines the type of the chip (active or unActive).',
      defaultValue: 'unActive',
    },
    iconProp: {
      control: 'text',
      description: 'Optional icon class name to display inside the chip.',
    },
    ellipsis: {
      control: 'boolean',
      description: 'If true, enables ellipsis for text overflow.',
      defaultValue: false,
    },
    tooltipOnEllipsis: {
      control: 'boolean',
      description: 'If true, shows a tooltip when the chip text is truncated.',
      defaultValue: false,
    },
    tooltipTitle: {
      control: 'text',
      description: 'The content of the tooltip displayed on ellipsis.',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<ChipProps> = (args) => <Chip {...args}>Example Chip............</Chip>;

// Base Story
export const Default = Template.bind({});
Default.args = {
  type: 'unActive',
  iconProp: '',
  ellipsis: false,
  tooltipOnEllipsis: false,
  tooltipTitle: '',
  children: 'Default Chip',
};

// Active Chip Story
export const ActiveChip = Template.bind({});
ActiveChip.args = {
  type: 'active',
  iconProp: 'icon-active',
  ellipsis: false,
  tooltipOnEllipsis: false,
  tooltipTitle: '',
  children: 'Active Chip',
};

// Chip with Tooltip Story
export const ChipWithTooltip = Template.bind({});
ChipWithTooltip.args = {
  type: 'active',
  iconProp: 'icon-tooltip',
  ellipsis: true,
  tooltipOnEllipsis: true,
  tooltipTitle: 'This is a tooltip for an ellipsed chip.',
  children: 'Chip with a long label that might overflow',
};

// All Variants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Type Variants */}
      {types.map((type) => (
        <div key={type} style={{ display: 'flex', gap: '1rem' }}>
          <Chip type={type} iconProp='icon-example'>
            {`${type.charAt(0).toUpperCase() + type.slice(1)} Chip`}
          </Chip>
        </div>
      ))}

      {/* Tooltip Variants */}
      <div>
        <Chip
          type='active'
          iconProp='icon-tooltip'
          ellipsis={true}
          tooltipOnEllipsis={true}
          tooltipTitle='Tooltip Example'
        >
          Chip with Tooltip
        </Chip>
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays different types and tooltip options for the Chip component.',
  },
};
