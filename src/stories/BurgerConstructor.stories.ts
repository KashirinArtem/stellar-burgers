import { BurgerConstructorUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/BurgerConstructor',
  component: BurgerConstructorUI,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BurgerConstructorUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultConstructor: Story = {
  args: {
    constructorItems: { bun: null, ingredients: [] },
    orderRequest: false,
    price: 0,
    orderModalData: null,
    onOrderClick: () => {},
    closeOrderModal: () => {}
  }
};
