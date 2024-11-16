import type { Meta, StoryObj } from '@storybook/react';
import Autocomplete from './autocomplete';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Reusable-Components/Autocomplete',
  component: Autocomplete,
  args: {
    onClear: action('onClear'),
    onSelect: action('onSelect'),
    style: {
      width: '100%',
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {};
