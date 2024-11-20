import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Select } from './select';
import { SelectProps } from './select';

const selectSizes = ['large', 'middle', 'small'] satisfies SelectProps['size'][];
const statusOptions = ['', 'error', 'warning'] satisfies SelectProps['status'][];
const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
] satisfies SelectProps['options'];

const meta = {
  title: 'UI-Kit/Select',
  component: Select,
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state of the select component.',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state of the select component.',
      table: {
        defaultValue: { summary: false },
      },
    },
    suffixIcon: {
      control: { type: null },
      description: 'Custom suffix icon for the select component.',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the select input.',
    },
    mode: {
      control: { type: 'select' },
      options: ['multiple', 'tags'],
      description: 'Mode of the select component.',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    options: {
      control: { type: 'object' },
      description: 'Array of options for the select component.',
    },
    size: {
      options: selectSizes,
      control: { type: 'select' },
      description: 'Size of the select component.',
      table: { defaultValue: { summary: 'true' } },
    },
    allowClear: {
      control: { type: 'boolean' },
      description: 'If true, the clear icon will appear to clear the selected option.',
      table: { defaultValue: { summary: true } },
    },
    children: {
      control: { type: null },
      description: 'Option elements passed as children.',
    },
    listHeight: {
      control: { type: 'number' },
      description: 'Specifies the height of the dropdown list.',
      table: { defaultValue: { summary: 70 } },
    },
    maxCount: {
      control: { type: 'number' },
      description: 'Specifies the maximum count of tags to display.',
      table: { defaultValue: { summary: 2 } },
    },
    defaultActiveFirstOption: {
      control: { type: 'boolean' },
      description: 'Whether to highlight the first option by default.',
      table: { defaultValue: { summary: true } },
    },
    status: {
      control: { type: 'select' },
      options: statusOptions,
      description: 'Validation status of the select component.',
      table: { defaultValue: { summary: 'undefined' } },
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Custom Select component wrapping Ant Design Select with additional styling and functionality.',
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

// Template for creating stories
const Template: StoryFn<SelectProps> = (args) => <Select {...args} />;

/** Default Select Component */
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Please select an option',
  options: selectOptions,
  style: { width: 300 },
  allowClear: false,
};

/** AllVariants Story */
export const AllVariants: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {/* Loading State */}
    <div>
      <h3>Loading State</h3>
      <Select loading placeholder="Loading options..." style={{ width: 300 }} />
    </div>

    {/* Disabled State */}
    <div>
      <h3>Disabled State</h3>
      <Select disabled placeholder="Select is disabled" options={selectOptions} style={{ width: 300 }} />
    </div>

    {/* Custom Suffix Icon */}
    <div>
      <h3>Custom Suffix Icon</h3>
      <Select
        placeholder="Select with custom icon"
        suffixIcon={<i className={'icon-chev-down'} />}
        options={selectOptions}
        style={{ width: 300 }}
      />
    </div>

    {/* Multiple Selection Mode */}
    <div>
      <h3>Multiple Selection Mode</h3>
      <Select mode="multiple" placeholder="Select multiple options" options={selectOptions} style={{ width: 300 }} />
    </div>

    {/* Tags Mode */}
    <div>
      <h3>Tags Mode</h3>
      <Select mode="tags" placeholder="Create or select tags" options={selectOptions} style={{ width: 300 }} />
    </div>

    {/* size */}
    <div>
      <h3 style={{ marginBottom: '0' }}>Size:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {selectSizes.map((size) => (
          <div key={size}>
            <h3>Select Size: {size}</h3>
            <Select placeholder="select option" options={selectOptions} style={{ width: 300 }} size={size} />
          </div>
        ))}
      </div>
    </div>

    {/* allowClear Mode */}
    <div>
      <h3>Allow Clear</h3>
      <Select placeholder="select option" options={selectOptions} style={{ width: 300 }} allowClear={true} />
    </div>

    {/* With Option Children */}
    <div>
      <h3>With Option Children</h3>
      <Select placeholder="Select using Option children" style={{ width: 300 }}>
        <Select.Option value="alpha">Alpha</Select.Option>
        <Select.Option value="beta">Beta</Select.Option>
        <Select.Option value="gamma">Gamma</Select.Option>
      </Select>
    </div>

    {/*list height*/}
    <div>
      <h3>List Height</h3>
      <Select placeholder="select option" options={selectOptions} listHeight={70}  style={{ width: 300 }}/>
    </div>

    {/*MaxCount*/}
    <div>
      <h3>Max Count</h3>
      <Select placeholder="select option" options={selectOptions} maxCount={2}  style={{ width: 300 }} mode={'multiple'}/>
    </div>

    {/*Default Active First Option*/}
    <div>
      <h3>Default Active First Option</h3>
      <Select placeholder="select option" options={selectOptions} defaultActiveFirstOption={true} style={{ width: 300 }} mode={'multiple'}/>
    </div>

    {/*Status*/}
    <div>
      <h3>Status:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {statusOptions.map((status) => (
        <Select placeholder="select option" options={selectOptions} status={status} style={{ width: 300 }} />))}
      </div>
    </div>

  </div>
);

AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription:
      'Displays the Select component with different configurations: loading state, disabled state, custom suffix icon, multiple selection, tags mode, and usage with Option children.',
  },
};
