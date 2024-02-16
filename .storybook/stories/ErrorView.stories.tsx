import { Meta, StoryObj } from "@storybook/react-native"
import { ErrorView, ErrorViewProps } from "../../app/components"
import { View } from "react-native"

const meta: Meta<ErrorViewProps> = {
  title: "ErrorView",
  component: ErrorView,
  args: {
    resetErrorBoundary: () => {
      alert("retrying...")
    },
  },
}

export default meta

type Story = StoryObj<ErrorViewProps>

export const Default: Story = {
  decorators: [
    (Story) => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
          width: "100%",
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
}
