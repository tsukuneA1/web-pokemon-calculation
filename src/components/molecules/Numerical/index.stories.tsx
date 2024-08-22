import { Meta, StoryObj } from '@storybook/react';
import Numerical from '.';

export default {
  title: 'Components/Numerical',
  component: Numerical,
} as Meta<typeof Numerical>;

type Story = StoryObj<typeof Numerical>;

export const Default: Story = {
  args: {
    AtOrSpe: '特攻',
    tagFontSize: 20,
    valFontSize: 15,
    effortVal: 0,
    buttonWidth: '60px',
    buttonHeight: '35px',
    buttonColor: '#6652b5',
    buttonBackground: '#ece9fb',
    buttonRadius: '20px',
    buttonFontSize: 16,
    seekbarWidth: '300px',
  },
};
