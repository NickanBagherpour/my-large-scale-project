import { Meta, StoryFn } from '@storybook/react';
import { DatePicker, DatePickerProps } from './date-picker';
import { dayjs } from '@oxygen/utils';

const meta = {
  title: 'UI-Kit/DatePicker',
  component: DatePicker,
  argTypes: {
    defaultValueStr: {
      control: 'text',
      description: 'Sets a default date value in string format (YYYY/MM/DD)',
    },
    disabledPast: {
      control: 'boolean',
      description: 'Disables past dates if true.',
      defaultValue: false,
    },
    disableFuture: {
      control: 'boolean',
      description: 'Disables future dates if true.',
      defaultValue: false,
    },
    format: {
      control: 'text',
      description: 'Defines the date format. (YYYY/MM/DD)',
      defaultValue: 'YYYY/MM/DD',
    },
    disabledDate: {
      description: 'A function to disable custom dates. ',
    },
    onChange: {
      action: 'changed',
      description: 'Handles date change events.',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<DatePickerProps> = (args) => <DatePicker {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  defaultValueStr: '2024/11/24',
};

// Disabled Past Dates
export const DisabledPastDates = Template.bind({});
DisabledPastDates.args = {
  disabledPast: true,
  defaultValueStr: '2024/11/24',
};

// Disable Future Dates
export const DisableFutureDates = Template.bind({});
DisableFutureDates.args = {
  disableFuture: true,
  defaultValueStr: '2024/11/24',
};

// Disabled Date Function
export const DisabledDateFunction = Template.bind({});
DisabledDateFunction.args = {
  disabledDate: (current) => {
    return current && current.isSame(dayjs('2024/12/01'), 'day');
  },
  defaultValueStr: '2024/11/28',
};

// Range Picker
export const RangePickerStory = () => <DatePicker.RangePicker defaultValue={[dayjs(), dayjs().add(1, 'day')]} />;

export const AllVariant: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>Default DatePicker</h3>
      <DatePicker defaultValueStr='2024/11/24' />

      <h3>Disabled Past Dates</h3>
      <DatePicker disabledPast={true} defaultValueStr='2024/11/24' />

      <h3>Disable Future Dates</h3>
      <DatePicker disableFuture={true} defaultValueStr='2024/11/24' />

      <h3>Custom Disabled Date Function</h3>
      <DatePicker
        disabledDate={(current) => current && current.isBefore(dayjs().add(2, 'day'), 'day')}
        defaultValueStr='2024/11/24'
      />

      <h3>RangePicker</h3>
      <DatePicker.RangePicker defaultValue={[dayjs(), dayjs().add(1, 'day')]} />
    </div>
  );
};
AllVariant.storyName = 'All Variant';
AllVariant.parameters = {
  docs: {
    storyDescription:
      'Displays different configurations for DatePicker component, including disabled dates, custom date functions, and RangePicker.',
  },
};
