import { Meta, StoryObj } from '@storybook/react';
import TextButton from '.';

export default {
  title: 'Components/TextButton',
  component: TextButton,
  argTypes: {
    color: { control: 'color' },
  },
} as Meta<typeof TextButton>;

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: {
    width: '100px',
    height: '100px',
    color: '#fff',
    fontSize: 24,
    text: '+',
    borderRadius: '50%',
    backgroundColor: '#000000',
    onClick: () => alert('textButton clicked'),
  },
};
