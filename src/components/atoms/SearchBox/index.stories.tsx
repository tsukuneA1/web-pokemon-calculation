import { Meta, StoryObj } from '@storybook/react';
import SearchBox from '.';

export default {
  title: 'components/SearchBox',
  component: SearchBox,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    text: { control: 'text' },
    fontSize: { control: 'text' },
  },
} as Meta<typeof SearchBox>;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  args: {
    width: 300,
    height: 100,
    text: 'ハバタクカミ',
    onClick: () => {
      alert('clicked');
    },
    fontSize: '20px',
  },
};
