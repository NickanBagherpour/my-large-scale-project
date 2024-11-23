import { Meta, StoryFn } from '@storybook/react';
import { Container, IWidgetWrapperProps } from './container';

const meta = {
  title: 'UI-Kit/Container',
  component: Container,
  decorators: [
    (Story) => (
      <div style={{ display: 'Flex', height: '90vh', flexDirection: 'column' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the header of the Container.',
      defaultValue: 'Default Title',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle displayed below the title in the header.',
      defaultValue: 'Default Subtitle',
    },
    caption: {
      control: 'text',
      description: 'Additional caption displayed in the header.',
    },
    footer: {
      control: 'text',
      description: 'Footer content displayed at the bottom of the Container.',
    },
    fillContainer: {
      control: 'boolean',
      description: 'If true, the Container fills its parent container.',
      defaultValue: true,
    },
    margin: {
      control: 'text',
      description: 'Sets the margin around the Container.',
    },
    marginTop: {
      control: 'text',
      description: 'Sets the top margin of the Container.',
    },
    marginBottom: {
      control: 'text',
      description: 'Sets the bottom margin of the Container.',
    },
    marginLeft: {
      control: 'text',
      description: 'Sets the left margin of the Container.',
    },
    marginRight: {
      control: 'text',
      description: 'Sets the right margin of the Container.',
    },
    children: {
      control: 'text',
      description: 'Content displayed inside the Container.',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<IWidgetWrapperProps> = (args) => <Container {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  title: 'Default Container',
  subtitle: 'This is a default subtitle.',
  caption: 'Default caption',
  fillContainer: true,
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Default State */}
      <div>
        <h3>Default State</h3>
        <Container title='Default Title' subtitle='Default Subtitle' caption='Default Caption'>
          <p style={{ display: 'flex', flexGrow: '1' }}>This is the default container content.</p>
        </Container>
      </div>

      {/* With Footer */}
      <div>
        <h3>With Footer</h3>
        <Container
          title='Container with Footer'
          subtitle='Subtitle for Container'
          caption='Caption text'
          footer={<div>Footer Content</div>}
        >
          <p style={{ display: 'flex', flexGrow: '1' }}>This container includes footer content.</p>
        </Container>
      </div>

      {/* Custom Margins */}
      <div>
        <h3>Custom Margins</h3>
        <Container
          title='Custom Margins'
          subtitle='Subtitle with margins'
          margin='20px'
          marginTop='10px'
          marginBottom='30px'
          fillContainer
        >
          <p style={{ display: 'flex', flexGrow: '1' }}>This container has custom margins applied.</p>
        </Container>
      </div>
      <div style={{ display: 'flex', height: '1000px' }}>
        <h3>Custom Fille</h3>
        <Container title='Custom Fill' subtitle='fill' fillContainer={false}>
          <p style={{ display: 'flex', flexGrow: '1' }}>This container doesnt have fill container.</p>
        </Container>
      </div>
    </div>
  );
};
