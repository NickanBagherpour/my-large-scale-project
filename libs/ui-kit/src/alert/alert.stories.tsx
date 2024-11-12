import { Meta, StoryFn } from '@storybook/react';
import { Alert, AlertProps } from './alert';

const argTypes = {
  type: {
    options: ['success', 'info', 'warning', 'error'],
    control: {
      type: 'radio',
    },
    description: 'Type of Alert styles.',
    defaultValue: 'info',
  },
  message: {
    control: 'text',
    description: 'Alert message title.',
    defaultValue: 'Alert message',
  },
  description: {
    control: 'text',
    description: 'Additional content of Alert.',
  },
  showIcon: {
    control: 'boolean',
    description: 'Whether to show icon.',
    defaultValue: false,
  },
  closable: {
    control: 'boolean',
    description: 'Whether Alert can be closed.',
    defaultValue: false,
  },
  closeText: {
    control: 'text',
    description: 'Close text to show.',
  },
  banner: {
    control: 'boolean',
    description: 'Whether to show as banner.',
    defaultValue: false,
  },
  shouldScroll: {
    control: 'boolean',
    description: 'Scrolls to the Alert when it appears if true.',
    defaultValue: false,
  },
  onClose: {
    action: 'closed',
    description: 'Callback when Alert is closed.',
  },
};

export default {
  title: 'UI-Kit/Alert',
  component: Alert,
  argTypes: argTypes,
} as Meta;

// Template for reusable stories
const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  message: 'Default Alert',
};

// All Variants Story
export const AllVariants: StoryFn = () => {
  const types: any = argTypes.type.options;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {types.map((type) => (
        <Alert key={type} type={type} message={`${type.charAt(0).toUpperCase() + type.slice(1)} Alert`} />
      ))}
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays all types of Alerts.',
  },
};

// With Description Story
export const WithDescription = Template.bind({});
WithDescription.args = {
  message: 'Information',
  description: 'This is an informational alert with additional description.',
  type: 'info',
};
WithDescription.storyName = 'With Description';

// Closable Alert Story
export const ClosableAlert = Template.bind({});
ClosableAlert.args = {
  message: 'Warning Alert',
  type: 'warning',
  closable: true,
};
ClosableAlert.storyName = 'Closable Alert';

// With Icon Story
export const WithIcon: StoryFn = () => {
  const types: any = argTypes.type.options;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {types.map((type) => (
        <Alert key={type} type={type} message={`${type.charAt(0).toUpperCase() + type.slice(1)} Alert`} showIcon />
      ))}
    </div>
  );
};
WithIcon.storyName = 'With Icon';

// Banner Alert Story
export const BannerAlert = Template.bind({});
BannerAlert.args = {
  message: 'This is a banner alert',
  banner: true,
};
BannerAlert.storyName = 'Banner Alert';

// Custom Close Text Story
export const CustomCloseText = Template.bind({});
CustomCloseText.args = {
  message: 'Custom Close Text',
  description: 'This alert has a custom close text.',
  type: 'info',
  closable: true,
  closeText: 'Got it',
};
CustomCloseText.storyName = 'Custom Close Text';
