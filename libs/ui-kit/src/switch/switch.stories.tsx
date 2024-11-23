import { Meta, StoryFn } from '@storybook/react/*';
import { Switch, SwitchProps } from './switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    notAllowed: {
      control: {
        type: 'boolean',
      },
      description: 'Disables the switch and applies a "not allowed" cursor.',
      defaultValue: false,
    },
    checked: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the switch is checked.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the switch is disabled.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function triggered when the switch state changes.',
    },
  },
} as Meta<typeof Switch>;

const Template: StoryFn<SwitchProps> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  notAllowed: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  disabled: false,
  notAllowed: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  disabled: true,
  notAllowed: false,
};

export const NotAllowed = Template.bind({});
NotAllowed.args = {
  checked: false,
  disabled: true,
  notAllowed: true,
};

export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h3>Default</h3>
        <Switch checked={false} disabled={false} notAllowed={false} />
      </div>
      <div>
        <h3>Checked</h3>
        <Switch checked={true} disabled={false} notAllowed={false} />
      </div>
      <div>
        <h3>Disabled</h3>
        <Switch checked={false} disabled={true} notAllowed={false} />
      </div>
      <div>
        <h3>Not Allowed</h3>
        <Switch checked={false} disabled={true} notAllowed={true} />
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays all variations of the Switch component in one view.',
  },
};
