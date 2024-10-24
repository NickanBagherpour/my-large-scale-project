import { Meta, StoryFn } from '@storybook/react';
import { Loading, LoadingProps } from './loading';
import { LoadingOutlined } from '@ant-design/icons';

const argTypes = {
  spinning: {
    control: 'boolean',
    description: 'Whether the loading indicator is spinning.',
    defaultValue: true,
  },
  size: {
    options: ['small', 'default', 'large'],
    control: {
      type: 'radio',
    },
    description: 'Size of the loading indicator.',
    defaultValue: 'default',
  },
  tip: {
    control: 'text',
    description: 'Custom description text shown below the loading indicator.',
  },
  delay: {
    control: 'number',
    description: 'Delay in milliseconds before the loading indicator appears.',
  },
  width: {
    control: 'text',
    description: 'Width of the container.',
    defaultValue: '100%',
  },
  height: {
    control: 'text',
    description: 'Height of the container.',
    defaultValue: 'min-content',
  },
  // Since `indicator` is a React node, we won't add it to controls
  // but we'll demonstrate its usage in a story.
};

export default {
  title: 'UI-Kit/Loading',
  component: Loading,
  argTypes: argTypes,
} as Meta;

// Template for reusable stories
const Template: StoryFn<LoadingProps> = (args) => <Loading {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};

// All Variants Story
export const AllVariants: StoryFn = () => {
  const sizes: any= argTypes.size.options;

  // Custom loading indicator using Ant Design icons
  const customIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Size Variations */}
      <div>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {sizes.map((size) => (
            <Loading key={size} size={size} />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div>
        <h3>With Tips</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Loading tip="Loading..." />
          <Loading tip="Please wait..." />
        </div>
      </div>

      {/* Delay */}
      <div>
        <h3>Delay</h3>
        <p>The spinner will appear after a delay of 1 second.</p>
        <Loading delay={1000} />
      </div>

      {/* Custom Indicator */}
      <div>
        <h3>Custom Indicator</h3>
        <Loading indicator={customIcon} />
      </div>

    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription:
      'Displays different sizes, tips, delays, custom indicators, and spinning states of the Loading component.',
  },
};
