import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ImageComponent from '.';

export default {
  title: 'Components/ImageComponent',
  component: ImageComponent,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    src: { control: 'text' },
    alt: { control: 'text' },
    borderRadius: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ImageComponent>;

type Story = StoryObj<typeof ImageComponent>;

export const Default: Story = {
  args: {
    src: 'public/favicon.ico',
    width: 300,
    height: 200,
    alt: 'Sample Image',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
  },
};
