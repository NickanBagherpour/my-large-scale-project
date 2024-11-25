import { Meta, StoryFn } from '@storybook/react';
import { LazyBox } from './lazy-box';

const meta = {
  title: 'UI-Kit/LazyBox',
  component: LazyBox,
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Indicates whether the LazyBox is in a loading state.',
      defaultValue: false,
    },
    title: {
      control: 'text',
      description: 'The main title displayed in the header.',
      defaultValue: 'LazyBox Title',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle displayed below the title in the header.',
      defaultValue: 'LazyBox Subtitle',
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the LazyBox content is expanded or collapsed.',
      defaultValue: false,
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback function triggered when the expand/collapse button is clicked.',
    },
    children: {
      control: 'text',
      description: 'The content displayed inside the LazyBox when expanded.',
    },
  },
} satisfies Meta<typeof LazyBox>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn = (args) => <LazyBox {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  title: 'Default LazyBox',
  subtitle: 'This is a default subtitle.',
  open: false,
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Default State */}
      <div>
        <h3>Default State</h3>
        <LazyBox title='Default State' subtitle='LazyBox is collapsed by default.' open={false} />
      </div>

      {/* Loading State */}
      <div>
        <h3>Loading State</h3>
        <LazyBox title='Loading State' subtitle='LazyBox is in loading state.' loading={true} />
      </div>

      {/* Expanded State */}
      <div>
        <h3>Expanded State</h3>
        <LazyBox title='Expanded State' subtitle='LazyBox is expanded.' open={true}>
          <p>This is the content of the expanded LazyBox.</p>
        </LazyBox>
      </div>

      {/* With Custom Content */}
      <div>
        <h3>With Custom Content</h3>
        <LazyBox title='Custom Content' subtitle='LazyBox with custom children.' open={true}>
          <ul>
            <li>Custom Item 1</li>
            <li>Custom Item 2</li>
          </ul>
        </LazyBox>
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription:
      'Displays different configurations of the LazyBox component, including loading, expanded, and custom content states.',
  },
};
