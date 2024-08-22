import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SeekBar from '.';

export default {
  title: 'Components/SeekBar',
  component: SeekBar,
  argTypes: {
    width: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    initialValue: { control: 'number' },
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SeekBar>;

type Story = StoryObj<typeof SeekBar>;

export const Default: Story = {
  args: {
    width: '50%',
    min: 0,
    max: 31,
    step: 1,
    initialValue: 0,
    backgroundColor: '#4caf50',
  },
};
