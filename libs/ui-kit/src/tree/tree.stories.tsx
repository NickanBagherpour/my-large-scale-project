import { Meta, StoryFn } from '@storybook/react';
import { Tree, TreeProps } from './tree';

const mockTreeData = [
  {
    title: 'Root',
    key: '0.0',
    children: [
      {
        title: 'Child 1',
        key: '0.1',
        children: [
          {
            title: 'Grandchild 1',
            key: '0.1.1',
          },
          {
            title: 'Grandchild 2',
            key: '0.1.2',
            children: [
              {
                title: 'GrandGrandchild 1',
                key: '0.1.2.1',
              },
            ],
          },
          {
            title: 'Grandchild 3',
            key: '0.1.3',
          },
        ],
      },
      {
        title: 'Child 2',
        key: '0.2',
        children: [
          {
            title: 'Grandchild 1',
            key: '0.2.1',
          },
        ],
      },
    ],
  },
];

export default {
  title: 'UI-Kit/Tree',
  component: Tree,
  argTypes: {
    showLine: {
      control: 'boolean',
      description: 'Shows or hides the connecting lines between nodes.',
      defaultValue: true,
    },
    checkable: {
      control: 'boolean',
      description: 'Shows or hides the check box.',
      defaultValue: true,
    },
    expandLevel: {
      control: 'number',
      description: 'Specifies how many levels of nodes should be expanded initially.',
      defaultValue: 1,
    },
    isCompact: {
      control: 'boolean',
      description: 'If true, the tree will have compact spacing.',
      defaultValue: false,
    },
    onExpand: {
      action: 'expanded',
      description: 'Callback function when a node is expanded or collapsed.',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback function when a node is selected.',
    },
    treeData: {
      control: 'object',
      description: 'Data used to build the tree.',
      defaultValue: mockTreeData,
    },
    secondaryNode: {
      control: 'object',
      description: 'A specific secondary node to highlight or track.',
    },
  },
} as Meta;

// Base Story
const Template: StoryFn<TreeProps> = (args) => <Tree {...args} />;

export const Default = Template.bind({});
Default.args = {
  treeData: mockTreeData,
};

const handleSelect = (keys, info) => {
  console.log('Selected Keys:', keys);
  console.log('Selected Node:', info.node);
};
// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h3>Default</h3>
        <Tree treeData={mockTreeData} />
      </div>
      <div>
        <h3>Checkable</h3>
        <Tree treeData={mockTreeData} checkable />
      </div>
      <div>
        <h3>Disabled</h3>
        <Tree treeData={mockTreeData} disabled />
      </div>
      <div>
        <h3>NoExpand</h3>
        <Tree treeData={mockTreeData} expandLevel={0} />
      </div>
      <div>
        <h3>CompactView</h3>
        <Tree treeData={mockTreeData} isCompact={true} />
      </div>
      <div>
        <h3>ShowNoLine</h3>
        <Tree treeData={mockTreeData} showLine={false} />
      </div>
      <div>
        <h3>InteractiveTree</h3>
        <Tree treeData={mockTreeData} onSelect={handleSelect} />
        <h4>* after click log information </h4>
      </div>
      <div>
        <h3>blockNode</h3>
        <Tree treeData={mockTreeData} blockNode />
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays all variant combinations.',
  },
};
