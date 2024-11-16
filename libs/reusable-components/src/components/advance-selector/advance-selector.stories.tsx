import type { Meta, StoryObj } from '@storybook/react';
import AdvanceSelector from './advance-selector';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Reusable-Components/AdvanceSelector',
  component: AdvanceSelector,
  args: {
    onClear: action('onClear'),
    onSelect: action('onSelect'),
    style: {
      width: '100%',
    },
  },
} satisfies Meta<typeof AdvanceSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {};
