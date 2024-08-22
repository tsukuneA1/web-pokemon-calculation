import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import IconButton from '.';
import { FaBeer, FaCoffee } from 'react-icons/fa';
import { FluentWeatherRainShowersDay20Filled } from '@/components/icons/Icons';

export default {
  title: 'Components/IconButton',
  component: IconButton,
} as Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

export const BeerIcon: Story = {
  args: {
    icon: <FaBeer size={24} />,
    onClick: () => alert('Beer icon clicked!'),
    ariaLabel: 'beer icon button',
  },
};

export const CoffeeIcon: Story = {
  args: {
    icon: <FaCoffee size={24} />,
    onClick: () => alert('Coffee icon clicked!'),
    ariaLabel: 'coffee icon button',
  },
};

export const EnvIcon: Story = {
  args: {
    icon: <FluentWeatherRainShowersDay20Filled />,
    onClick: () => alert('Env icon clicked!'),
    ariaLabel: 'Env icon button',
  },
};
