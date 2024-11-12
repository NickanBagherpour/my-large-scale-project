import { Meta, StoryFn } from '@storybook/react';
import { MarkText, PropsType } from './mark-text';

const highlightColors = [
  'success',
  'warning',
  'error',
  '#333',
  'red',
  '#FF00FF',
  'rgb(255,0,0)',
  'rgba(0,0,0,0.5)',
] satisfies PropsType['highlightColor'][];

const meta: Meta<typeof MarkText> = {
  title: 'UI-Kit/MarkText',
  component: MarkText,
  argTypes: {
    text: {
      control: 'text',
      description: 'The full text content.',
      table: {
        defaultValue: { summary: 'This is an example text to demonstrate the MarkText component.' },
      },
    },
    wordToHighlight: {
      control: 'text',
      description: 'The word or phrase to highlight within the text.',
      table: {
        defaultValue: {
          summary: 'example',
        },
      },
    },
    highlightColor: {
      // options: highlightColors,
      // control: {type:"select"},
      control: 'text',
      description:
        'Defines the color used to highlight the word. Accepts semantic color names ("success", "warning", "error") or any valid CSS color string.',
      table: {
        defaultValue: {
          summary: 'success',
        },
      },
    },
    className: {
      control: false,
      description: 'Optional CSS class name for custom styling.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MarkText>;

export default meta;

// Define a Template for reusable stories
const Template: StoryFn<PropsType> = (args) => <MarkText {...args} />;

// Base Story
export const Default = Template.bind({});
Default.args = {
  text: 'This is an example text to demonstrate the MarkText component.',
  wordToHighlight: 'example',
  highlightColor: 'success',
};

// AllVariants Story
export const AllVariants: StoryFn = () => {
  const text = 'Highlighting different words in this text for demonstration.';
  const wordsToHighlight = ['Highlighting', 'different', 'demonstration'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Highlight Color Variations */}
      {highlightColors.map((color) => (
        <div key={color}>
          <h3>Highlight Color: {color}</h3>
          <MarkText text={text} wordToHighlight='Highlighting' highlightColor={color} />
        </div>
      ))}

      {/* Word to Highlight Variations */}
      <div>
        <h3>Words to Highlight</h3>
        {wordsToHighlight.map((word) => (
          <MarkText key={word} text={text} wordToHighlight={word} highlightColor='success' />
        ))}
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription: 'Displays the MarkText component with different highlight colors and words to highlight.',
  },
};
