import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Autocomplete from './advance-selector';

const meta = {
  title: 'Reusable-Components/Autocomplete',
  component: Autocomplete,
  args: {
    onClear: fn(),
    onSelect: fn(),
    style: {
      width: '100%',
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {};
