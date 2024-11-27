import { Meta, StoryFn } from '@storybook/react';
import { Progress, ProgressProps } from './progress';

const meta = {
  title: 'UI-Kit/Progress',
  component: Progress,
  argTypes: {
    percent: {
      control: { type: 'number' },
      description: 'It determines the progress (percentage)',
      defaultValue: 50,
    },
    isPrimary: {
      control: { type: 'boolean' },
      description: 'If true, it uses the primary theme color',
      defaultValue: false,
    },
    height: {
      control: { type: 'text' },
      description: 'Custom height for the progress bar',
      defaultValue: '8px',
    },
    status: {
      options: ['normal', 'exception', 'active', 'success'],
      control: { type: 'radio' },
      description: 'Progress bar status',
      defaultValue: 'normal',
    },
    showInfo: {
      control: { type: 'boolean' },
      description: 'Whether the percentage information should be displayed or not',
      defaultValue: true,
    },
    strokeColor: {
      control: 'color',
      description: 'Custom color for the progress bar',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

const Template: StoryFn<ProgressProps> = (args) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  percent: 50,
  isPrimary: false,
  height: '8px',
};

export const AllVariants: StoryFn = () => {
  const statuses = ['normal', 'exception', 'active', 'success'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Statuses</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {statuses.map((status) => (
            <>
              <label>{status}</label>
              <Progress
                key={status}
                percent={50}
                status={status}
                isPrimary={status === 'active'}
                height={status === 'exception' ? '16px' : '8px'}
                showInfo
              />
            </>
          ))}
        </div>
      </div>

      <div>
        <h3>Custom Stroke Colors</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Progress percent={70} strokeColor='red' height='12px' />
          <Progress percent={50} strokeColor='green' height='10px' />
          <Progress percent={90} strokeColor='#4caf50' height='8px' />
        </div>
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Display all states and custom colors for the Progress component',
  },
};
