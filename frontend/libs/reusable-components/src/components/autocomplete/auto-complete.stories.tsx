import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Autocomplete from './autocomplete';

const meta = {
  title: 'Reusable-Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    style: { control: 'object' },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  args: {
    onClear: fn(),
    onSelect: fn(),
    style: {
      width: '100%',
    },
  },
};
