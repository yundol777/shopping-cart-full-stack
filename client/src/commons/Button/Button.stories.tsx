import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta = {
  title: "Commons/Button",
  component: Button,
  args: {
    label: "버튼",
    onClick: () => {},
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
