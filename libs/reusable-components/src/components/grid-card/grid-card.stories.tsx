import type { Meta, StoryObj } from '@storybook/react';
import GridCard from './grid-card';

const meta = {
  title: 'Reusable-Components/GridCard',
  component: GridCard,
  argTypes: {
    name: { control: 'text' },
    englishName: { control: 'text' },
    status: { control: 'select', options: ['active', 'inactive'] },
    date: { control: 'text' },
    href: { control: 'text' },
    wordToHighlight: { control: 'text' },
  },
} satisfies Meta<typeof GridCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UpstreamCard: Story = {
  args: {
    name: 'اپ بله',
    englishName: 'englishName',
    status: 'active',
    date: '01/12/1403',
    href: '/',
    wordToHighlight: 'بله',
  },
};

export const ClientCard: Story = {
  args: {
    href: '/',
    name: 'API-SERVICES-UPSTREAM',
    activeServersCount: 12,
    wordToHighlight: 'بله',
  },
};
