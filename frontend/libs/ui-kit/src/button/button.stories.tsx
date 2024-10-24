import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './button';

// Define argTypes for Storybook Controls
const argTypes = {
  color: {
    options: ['primary', 'secondary', 'warning', 'error'],
    control: {
      type: 'radio',
    },
    description: 'Defines the color theme of the button.',
    defaultValue: 'primary',
  },
  variant: {
    options: ['solid', 'outlined', 'filled', 'dashed', 'text', 'link'],
    control: {
      type: 'select',
    },
    description: 'Defines the variant style of the button.',
    defaultValue: 'solid',
  },
  size: {
    options: ['small', 'middle', 'large'],
    control: {
      type: 'radio',
    },
    description: 'Defines the size of the button.',
    defaultValue: 'middle',
  },
  flex: {
    control: 'boolean',
    description: 'If true, the button will flexibly adjust its width.',
    defaultValue: true,
  },
  disabled: {
    control: 'boolean',
    description: 'Disables the button if true.',
    defaultValue: false,
  },
  loading: {
    control: 'boolean',
    description: 'Displays a loading spinner if true.',
    defaultValue: false,
  },
  onClick: { action: 'clicked', description: 'Handles click events.' },
  icon: {
    control: false, // Icons are handled separately
    description: 'Optional icon to display inside the button.',
  },
};

export default {
  title: 'UI-Kit/Button',
  component: Button,
  argTypes: argTypes,
} as Meta;

// Define a Template for reusable stories
const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  children: 'Base Button',
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  const colors: any = argTypes.color.options;
  const variants: any = argTypes.variant.options;
  const sizes: any = argTypes.size.options;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Color and Variant Combinations */}
      {colors.map((color) => (
        <div key={color}>
          <h3 style={{ textTransform: 'capitalize' }}>{color} Color</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {variants.map((variant) => (
              <Button key={variant} color={color} variant={variant}>
                {variant!.charAt(0).toUpperCase() + variant!.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      ))}

      {/* Size Variations */}
      <div>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {sizes.map((size) => (
            <Button key={size} size={size} variant='filled'>
              {size!.charAt(0).toUpperCase() + size!.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* States */}
      <div>
        <h3>States</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button icon={<i className='icon-plus' />}>With Icon</Button>
        </div>
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays all color and variant combinations, sizes, and states in one view.',
  },
};
