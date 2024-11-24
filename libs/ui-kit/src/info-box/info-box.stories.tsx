import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { InfoBox, InfoBoxProps } from './info-box';
import { Box } from '../box/box';
import { InfoItemType } from '@oxygen/types';

// Mock Data
const mockData: InfoItemType[] = [
  { key: 'Name', value: 'John Doe', subValue: 'Admin', type: 'text', fullwidth: false },
  { key: 'Email', value: 'johndoe@example.com', subValue: '', type: 'text', fullwidth: false },
  { key: 'Files', value: 'this is files value', files: ['File1', 'File2'], type: 'file', fullwidth: false },
  { key: 'Description', value: 'description about John.', subValue: '', type: 'text', fullwidth: false },
  { key: 'fullwidth', value: 'this is full width.', subValue: '', type: 'text', fullwidth: true },
  { key: 'subvalue', value: 'this is vlaue', subValue: 'this is subvalue', type: 'text' },
  { key: 'displayValue true', value: 'displayValue', type: 'text', subValue: 'subvalue', displayValue: true },
  { key: 'displayValue false', value: 'displayValue', type: 'text', subValue: 'subvalue', displayValue: false },
];

const argTypes = {
  data: {
    control: 'object',
    description: 'Array of information items to display in the InfoBox.',
    defaultValue: mockData,
  },
  footer: {
    control: 'text',
    description: 'Optional footer content displayed below the grid.',
    defaultValue: 'Footer Content',
  },
  isDense: {
    control: 'boolean',
    description: 'Whether the layout is dense with reduced spacing.',
    defaultValue: false,
  },
  margin: {
    control: 'text',
    description: 'CSS margin value for the InfoBox.',
    defaultValue: '2rem 3.2rem',
  },
  minColumnCount: {
    control: 'number',
    description: 'Minimum number of grid columns.',
    defaultValue: 4,
  },
  titleWordWrap: {
    control: 'boolean',
    description: 'Allows title text to wrap if true.',
    defaultValue: true,
  },
  loading: {
    control: 'boolean',
    description: 'Displays a loading spinner if true.',
    defaultValue: false,
  },
};

export default {
  title: 'UI-Kit/InfoBox',
  component: InfoBox,
  argTypes: argTypes,
} as Meta;

// Template for reusable stories
const Template: StoryFn<InfoBoxProps> = (args) => <InfoBox {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  data: mockData,
  footer: <Box>Footer Content</Box>,
  isDense: false,
  minColumnCount: 4,
  titleWordWrap: true,
  loading: false,
};

// Loading State Story
export const LoadingState = Template.bind({});
LoadingState.args = {
  loading: true,
  data: [],
};

// Dense Layout Story
export const DenseLayout = Template.bind({});
DenseLayout.args = {
  data: mockData,
  isDense: true,
};

// Custom Footer Story
export const CustomFooter = Template.bind({});
CustomFooter.args = {
  data: mockData,
  footer: (
    <Box>
      <button>Action 1</button>
      <button>Action 2</button>
    </Box>
  ),
};

// All Variants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>Default Layout</h3>
      <InfoBox data={mockData} minColumnCount={4} />

      <h3>Dense Layout</h3>
      <InfoBox data={mockData} isDense={true} minColumnCount={3} />

      <h3>Loading State</h3>
      <InfoBox data={mockData} loading />

      <h3>Custom Footer</h3>
      <InfoBox
        data={mockData}
        footer={
          <Box>
            <button>Custom Action</button>
          </Box>
        }
      />
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Demonstrates all variations of the InfoBox component in one view.',
  },
};
