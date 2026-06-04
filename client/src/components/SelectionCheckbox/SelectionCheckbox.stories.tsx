import type { Meta, StoryObj } from "@storybook/react-vite";

import SelectionCheckbox from "./SelectionCheckbox";

const meta = {
  title: "Components/SelectionCheckbox",
  component: SelectionCheckbox,
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof SelectionCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    isChecked: false,
  },
};
