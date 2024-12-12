import type { Meta, StoryObj } from '@storybook/react';
import GridCard from './grid-card';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Reusable-Components/GridCard',
  component: GridCard,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    status: { control: 'select', options: ['active', 'inactive'] },
    date: { control: 'text' },
    href: { control: 'text' },
    wordToHighlight: { control: 'text' },
  },
} satisfies Meta<typeof GridCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClientCard: Story = {
  args: {
    title: 'اپ بله',
    hasSetting: true,
    subTitle: 'englishName',
    status: 'active',
    date: '01/12/1403',
    href: '/',
    wordToHighlight: 'بله',
  },
};

export const UpstreamListCard: Story = {
  args: {
    href: '/',
    title: 'API-SERVICES-UPSTREAM',
    serversCount: 12,
    wordToHighlight: 'بله',
    isHeaderLtr: true,
  },
};

export const UpstreamCreationCard: Story = {
  args: {
    onClick: action('onClick'),
    title: 'API-SERVICES-UPSTREAM',
    isActive: true,
    serversCount: 12,
    isHeaderLtr: true,
  },
};
