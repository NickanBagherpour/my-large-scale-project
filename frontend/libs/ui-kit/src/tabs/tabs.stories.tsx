import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { TabsProps } from 'antd';

import { Tabs } from './tabs';

const tabTypes = ['line', 'card', 'editable-card'] satisfies TabsProps['type'][];
const tabPositions = ['top', 'right', 'bottom', 'left'] satisfies TabsProps['tabPosition'][];
const tabSizes = ['large', 'middle', 'small'] satisfies TabsProps['size'][];

const meta = {
  title: 'UI-Kit/Tabs',
  component: Tabs,
  argTypes: {
    defaultActiveKey: {
      control: { type: 'text' },
      description: "Initial active TabPane's key, if activeKey is not set.",
      table: {
        defaultValue: { summary: '1' },
      },
    },
    activeKey: {
      control: { type: 'text' },
      description: "Current active TabPane's key.",
    },
    onChange: {
      action: 'onChange',
      description: 'Callback executed when tab is changed.',
    },
    type: {
      control: { type: 'select' },
      options: tabTypes,
      description: 'Basic style of tabs.',
      table: {
        defaultValue: { summary: 'line' },
      },
    },
    size: {
      control: { type: 'select' },
      options: tabSizes,
      description: 'Preset size of the tabs.',
      table: {
        defaultValue: { summary: 'middle' },
      },
    },
    tabPosition: {
      control: { type: 'select' },
      options: tabPositions,
      description: 'Position of tabs.',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    items: {
      control: { type: false },
      description: 'content of the tabs.',
    },
    tabBarExtraContent: {
      control: { type: false },
      description: 'Extra content in tab bar.',
    },
    children: {
      control: { type: false },
      description: 'Content of the Tabs, usually TabPane elements.',
    },
    className: {
      control: { type: false },
      description: 'Optional CSS class name for custom styling.',
    },
    style: {
      control: { type: false },
      description: 'Optional inline styles.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<TabsProps> = (args) => <Tabs {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  defaultActiveKey: '1',
  type: 'line',
  size: 'middle',
  tabPosition: 'top',
  items: [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ],
};

// AllVariants Story with Editable Tabs
export const AllVariants: StoryFn = () => {
  // State for editable tabs
  const [editableItems, setEditableItems] = React.useState([
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1 - Type: editable-card',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2 - Type: editable-card',
    },
  ]);
  const [activeKey, setActiveKey] = React.useState('1');
  const newTabIndex = React.useRef(0);

  // Handlers for editable tabs
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newItems = [...editableItems];
    newItems.push({
      key: newActiveKey,
      label: 'New Tab',
      children: 'Content of new Tab',
    });
    setEditableItems(newItems);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    editableItems.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newItems = editableItems.filter((item) => item.key !== targetKey);
    if (newItems.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newItems[lastIndex].key;
      } else {
        newActiveKey = newItems[0].key;
      }
    }
    setEditableItems(newItems);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else if (action === 'remove') {
      remove(targetKey);
    }
  };

  // Function to render tabs based on type
  const renderTabsByType = (type: TabsProps['type']) => {
    if (type === 'editable-card') {
      return <Tabs type={type} activeKey={activeKey} onChange={onChange} onEdit={onEdit} items={editableItems} />;
    } else {
      return (
        <Tabs
          defaultActiveKey='1'
          type={type}
          items={[
            {
              key: '1',
              label: 'Tab 1',
              children: `Content of Tab Pane 1 - Type: ${type}`,
            },
            {
              key: '2',
              label: 'Tab 2',
              children: `Content of Tab Pane 2 - Type: ${type}`,
            },
          ]}
        />
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>Tab Types</h2>
      {tabTypes.map((type) => (
        <div key={type}>
          <h3>Type: {type}</h3>
          {renderTabsByType(type)}
        </div>
      ))}

      <h2>Tab Positions</h2>
      {tabPositions.map((position) => (
        <div key={position}>
          <h3>Position: {position}</h3>
          <Tabs
            defaultActiveKey='1'
            tabPosition={position}
            items={[
              {
                key: '1',
                label: 'Tab 1',
                children: `Content of Tab Pane 1 - Position: ${position}`,
              },
              {
                key: '2',
                label: 'Tab 2',
                children: `Content of Tab Pane 2 - Position: ${position}`,
              },
            ]}
          />
        </div>
      ))}

      <h2>Tab Sizes</h2>
      {tabSizes.map((size) => (
        <div key={size}>
          <h3>Size: {size}</h3>
          <Tabs
            defaultActiveKey='1'
            size={size}
            items={[
              {
                key: '1',
                label: 'Tab 1',
                children: `Content of Tab Pane 1 - Size: ${size}`,
              },
              {
                key: '2',
                label: 'Tab 2',
                children: `Content of Tab Pane 2 - Size: ${size}`,
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
};

AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription:
      'Displays the Tabs component with different configurations: types, positions, and sizes. When the tab type is set to "editable-card", you can add, remove, and edit tabs.',
  },
};
