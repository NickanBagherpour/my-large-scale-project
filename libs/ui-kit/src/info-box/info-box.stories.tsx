import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InfoBox } from './info-box';
import { Box } from '../box/box';

export default {
  title: 'Components/InfoBox',
  component: InfoBox,
  argTypes: {
    data: { control: 'object' },
    footer: { control: 'text' },
    isDense: { control: 'boolean' },
    margin: { control: 'text' },
    minColumnCount: { control: 'number' },
    titleWordWrap: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} as ComponentMeta<typeof InfoBox>;

const Template: ComponentStory<typeof InfoBox> = (args) => <InfoBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      key: 'Name',
      value: 'John Doe',
      subValue: 'Administrator',
      type: 'text',
      fullwidth: false,
    },
    {
      key: 'Email',
      value: 'john.doe@example.com',
      subValue: '',
      type: 'text',
      fullwidth: false,
    },
    {
      key: 'Phone',
      value: '+123 456 7890',
      subValue: '',
      type: 'text',
      fullwidth: false,
    },
    {
      key: 'Files',
      files: ['File1.pdf', 'File2.docx'],
      type: 'file',
      fullwidth: false,
    },
  ],
  footer: <Box>Footer content here</Box>,
  isDense: false,
  margin: '2rem 3.2rem',
  minColumnCount: 4,
  titleWordWrap: true,
  loading: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  data: null,
  loading: true,
  footer: null,
};

export const DenseLayout = Template.bind({});
DenseLayout.args = {
  ...Default.args,
  isDense: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  footer: <Box>No data footer</Box>,
  isDense: false,
  loading: false,
};

export const CustomFooter = Template.bind({});
CustomFooter.args = {
  ...Default.args,
  footer: (
    <Box>
      <button>Save</button>
      <button>Cancel</button>
    </Box>
  ),
};
