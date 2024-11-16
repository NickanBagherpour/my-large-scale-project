import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Dragger, DraggerProps } from './dragger';

const meta = {
  title: 'UI-Kit/Dragger',
  component: Dragger,
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
      description: 'Disables the dragger.',
      table: {
        defaultValue: { summary: false },
      },
    },
    displayDefaultChildren: {
      control: { type: 'boolean' },
      description: 'Whether to display the default dragger content.',
      table: {
        defaultValue: { summary: false },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'The title displayed in the dragger area.',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'The description displayed below the title in the dragger area.',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: { type: false },
      description: 'Custom content inside the dragger component.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dragger>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<DraggerProps> = (args) => <Dragger {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  action: 'https://example.com/upload',
  multiple: false,
  showUploadList: true,
  displayDefaultChildren: true,
  title: 'Upload your files',
  description: 'Drag and drop files here or click to upload.',
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Default Dragger */}
      <div>
        <h3>Default Dragger</h3>
        <Dragger
          action="https://example.com/upload"
          displayDefaultChildren
          title="Default Dragger"
          description="Drag and drop files or click to upload."
        />
      </div>

      {/* Multiple Uploads */}
      <div>
        <h3>Multiple Uploads</h3>
        <Dragger
          action="https://example.com/upload"
          multiple
          displayDefaultChildren
          title="Multiple Uploads"
          description="Drag and drop multiple files or click to upload."
        />
      </div>

      {/* Disabled Dragger */}
      <div>
        <h3>Disabled Dragger</h3>
        <Dragger
          action="https://example.com/upload"
          disabled
          displayDefaultChildren
          title="Disabled Dragger"
          description="Uploading is disabled."
        />
      </div>

      {/* Custom Accepted Files */}
      <div>
        <h3>Custom Accepted Files</h3>
        <Dragger
          action="https://example.com/upload"
          accept=".doc,.docx,.pdf"
          displayDefaultChildren
          title="Custom Accepted Files"
          description="Only .doc, .docx, and .pdf files are allowed."
        />
      </div>

      {/* Without Default Children */}
      <div>
        <h3>Without Default Children</h3>
        <Dragger
          action="https://example.com/upload"
          showUploadList
          title="Custom Content"
        >
          <div style={{ textAlign: 'center' }}>
            <i className="ri-upload-cloud-line" style={{ fontSize: '2rem', color: '#1890ff' }} />
            <p>Click or drag files here to upload.</p>
          </div>
        </Dragger>
      </div>
    </div>
  );
};

AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays the Dragger component with different configurations: default dragger, multiple uploads, disabled state, custom accepted file types, and custom children.',
  },
};
