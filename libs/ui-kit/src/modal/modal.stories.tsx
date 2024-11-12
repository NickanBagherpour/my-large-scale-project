import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { Button } from 'antd';

import { Modal, ModalProps } from './modal';

const modalSizes = [320, 520, 800] as const;

const meta = {
  title: 'UI-Kit/Modal',
  component: Modal,
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the modal.',
      table: {
        defaultValue: { summary: false },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'The title displayed at the top of the modal.',
      table: {
        defaultValue: { summary: 'Modal Title' },
      },
    },
    headerDivider: {
      control: { type: 'boolean' },
      description: 'Shows a divider below the header when true.',
      table: {
        defaultValue: { summary: true },
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the modal dialog in pixels.',
      table: {
        defaultValue: { summary: 520 },
      },
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Centers the modal vertically in the viewport.',
      table: {
        defaultValue: { summary: false },
      },
    },
    okText: {
      control: { type: 'text' },
      description: 'Custom text for the OK button.',
      table: {
        defaultValue: { summary: 'OK' },
      },
    },
    cancelText: {
      control: { type: 'text' },
      description: 'Custom text for the Cancel button.',
      table: {
        defaultValue: { summary: 'Cancel' },
      },
    },
    onOk: {
      action: 'onOk',
      description: 'Callback when the OK button is clicked.',
    },
    onCancel: {
      action: 'onCancel',
      description: 'Callback when the Cancel button is clicked.',
    },
    footer: {
      control: { type: false },
      description: 'Custom footer content. Set to null to hide the default footer. Can be customized.',
    },
    children: {
      control: { type: false },
      description: 'The content of the modal.',
    },
    className: {
      control: { type: false },
      description: 'Optional CSS class name for custom styling.',
    },
    style: {
      control: { type: false },
    },
    maskClosable: {
      control: { type: 'boolean' },
      description: 'Whether to close the modal when clicking on the mask.',
      table: {
        defaultValue: { summary: true },
      },
    },
  },
  // tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<ModalProps> = (args, { viewMode }) => {
  // if (viewMode !== 'docs') {
  return <Modal {...args} />;
  // } else {
  //   return <></>;
  // }
};

// Default Story
export const Default = Template.bind({});
Default.args = {
  visible: true,
  title: 'Default Modal',
  headerDivider: true,
  maskClosable: true,
  children: (
    <>
      <p>This is the content of the modal.</p>
      <p>You can put any React nodes here.</p>
    </>
  ),
};
// Default.parameters = {
//   docs: {
// disable: true,
// description: {
//   story: 'The default modal is not visible by default. Use the controls to toggle visibility.',
// },
//   },
// };

//// AllVariants Story
export const AllVariants: StoryFn = () => {
  const [visibleModal, setVisibleModal] = React.useState<number | null>(null);

  const modals = [
    { id: 1, title: 'Modal with Header Divider', headerDivider: true },
    { id: 2, title: 'Modal without Header Divider', headerDivider: false },
    { id: 3, title: 'Centered Modal', centered: true },
    { id: 4, title: 'Custom Width Modal', width: 800 },
  ];

  const openModal = (id: number) => {
    setVisibleModal(id);
  };

  const closeModal = () => {
    setVisibleModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {modals.map((modal) => (
        <div key={modal.id}>
          <Button type='primary' onClick={() => openModal(modal.id)}>
            Open {modal.title}
          </Button>
          <Modal
            open={visibleModal === modal.id}
            title={modal.title}
            onOk={closeModal}
            onCancel={closeModal}
            headerDivider={modal?.headerDivider}
            centered={modal?.centered}
            width={modal?.width}
          >
            <p>This is the content of {modal.title}.</p>
          </Modal>
        </div>
      ))}
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription:
      'Displays the Modal component with different configurations: header divider variations, centered modal, and custom width.',
  },
};
