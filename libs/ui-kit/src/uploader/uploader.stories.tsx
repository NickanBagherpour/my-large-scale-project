import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Uploader, UploaderProps } from './uploader';

const defaultFileList = [
  {
    uid: '1',
    name: 'xxx.png',
    status: 'uploading',
    url: 'http://www.baidu.com/xxx.png',
    percent: 58,
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  },
] satisfies UploaderProps['defaultFileList'];

const progressInfo = {
  strokeColor: {
    '0%': '#108ee9',
    '100%': '#87d068',
  },
  strokeWidth: 5,
  format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
} satisfies UploaderProps['progress'];

const meta = {
  title: 'UI-Kit/Uploader',
  component: Uploader,
  argTypes: {
    action: {
      control: { type: 'text' },
      description: 'The URL or function to handle the upload action.',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'If true, allows multiple file uploads.',
      table: {
        defaultValue: { summary: false },
      },
    },
    accept: {
      control: { type: 'text' },
      description: 'Specifies the types of files that can be selected.',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    showUploadList: {
      control: { type: 'boolean' },
      description: 'Whether to show a list of uploaded files.',
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the uploader.',
      table: {
        defaultValue: { summary: false },
      },
    },
    children: {
      control: { type: false },
      description: 'Custom content inside the uploader component.',
    },
    directory: {
      control: { type: 'boolean' },
      description: 'Support upload whole directory.',
      table: { defaultValue: { summary: false } },
    },
    maxCount: {
      control: { type: 'number' },
      description: 'Limit the number of uploaded files. Will replace current one when maxCount is 1',
      table: { defaultValue: { summary: 10 } },
    },
    defaultFileList: {
      control: { type: 'object' },
      description: 'Default list of files that have been uploaded',
      table: { defaultValue: { summary: null } },
    },
    progress: {
      control: { type: 'object' },
      description: 'Custom progress bar',
      table: { defaultValue: { summary: null } },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Uploader>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<UploaderProps> = (args) => <Uploader {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  action: 'https://example.com/upload',
  multiple: false,
  showUploadList: true,
  accept: '.png,.jpg,.jpeg',
  children: <button>Click to Upload</button>,
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Multiple Uploads */}
      <div>
        <h3>Multiple Uploads</h3>
        <Uploader
          action="https://example.com/upload"
          multiple
          showUploadList
          children={<button>Upload Multiple Files</button>}
        />
      </div>

      {/* Disabled Uploader */}
      <div>
        <h3>Disabled Uploader</h3>
        <Uploader
          action="https://example.com/upload"
          disabled
          children={<button disabled>Uploader Disabled</button>}
        />
      </div>

      {/* Custom Accepted Files */}
      <div>
        <h3>Custom Accepted Files</h3>
        <Uploader
          action="https://example.com/upload"
          accept=".doc,.docx,.pdf"
          children={<button>Upload Documents</button>}
        />
      </div>

      {/* Without Upload List */}
      <div>
        <h3>Without Upload List</h3>
        <Uploader
          action="https://example.com/upload"
          showUploadList={false}
          children={<button>Upload Without List</button>}
        />
      </div>

      {/* Upload Directory */}
      <div>
        <h3>Upload Directory</h3>
        <Uploader
          action="https://example.com/upload"
          showUploadList={true}
          directory
          children={<button>Upload Directory</button>}
        />
      </div>

      {/* Upload MaxCount */}
      <div>
        <h3>Upload MaxCount</h3>
        <Uploader
          action="https://example.com/upload"
          showUploadList={true}
          multiple
          maxCount={3}
          children={<button>Upload With MaxCount</button>}
        />
      </div>

      {/* Default File List */}
      <div>
        <h3>Default File List</h3>
        <Uploader
          action="https://example.com/upload"
          showUploadList={true}
          multiple
          defaultFileList={defaultFileList}
          children={<button>Upload with Default File List</button>}
        />
      </div>

      {/* custom progress bar */}
      <div>
        <h3>Custom Progress Bar</h3>
        <Uploader
          action="https://example.com/upload"
          showUploadList={true}
          multiple
          progress={progressInfo}
          defaultFileList={defaultFileList}
          children={<button>Upload With Custom Progress Bar</button>}
        />
      </div>


    </div>
  );
};

AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays the Uploader component with different configurations: multiple uploads, disabled state, custom accepted file types, and without showing the upload list.',
  },
};
