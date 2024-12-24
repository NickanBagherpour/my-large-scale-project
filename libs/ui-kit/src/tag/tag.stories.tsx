import { Meta, StoryFn } from '@storybook/react';
import { Tag, TagType } from './tag';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const types = ['default', 'FinalApproval', 'initialApproval', 'processing', 'error', 'warning'] as const;

const argTypes = {
  type: {
    options: types,
    control: {
      type: 'radio',
    },
    description: 'Defines the type of the tag.',
    defaultValue: 'default',
  },
  children: {
    control: 'text',
    description: 'Content to be displayed inside the tag.',
    defaultValue: 'Sample Tag',
  },
  bordered: {
    control: 'boolean',
    description: 'If true, adds a border to the tag.',
    defaultValue: false,
  },
};

export default {
  title: 'UI-Kit/Tag',
  component: Tag,
  argTypes,
} as Meta;

// Define a Template for reusable stories
const Template: StoryFn<TagType> = (args) => <Tag {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  children: 'Default Tag',
};

// Bordered Tags with Icons
export const BorderedWithIcons: StoryFn = () => {
  const icons = {
    default: <InfoCircleOutlined />,
    FinalApproval: <CheckCircleOutlined />,
    initialApproval: <SyncOutlined spin />,
    processing: <SyncOutlined />,
    error: <CloseCircleOutlined />,
    warning: <WarningOutlined />,
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {types.map((type) => (
        <Tag key={type} type={type} bordered icon={<i className='icon-tick-circle-outlined' />}>
          {/* {icons[type]} <span style={{ marginLeft: 4 }}>{type}</span> */}
          tag with icon
        </Tag>
      ))}
    </div>
  );
};
BorderedWithIcons.storyName = 'Bordered Tags with Icons';
BorderedWithIcons.parameters = {
  docs: {
    storyDescription: 'Displays all available tag types with borders and corresponding icons.',
  },
};

// Playground
export const Playground = Template.bind({});
Playground.storyName = 'Playground';
Playground.parameters = {
  docs: {
    storyDescription: 'Interactive playground to test different props on the Tag component.',
  },
};
