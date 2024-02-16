import { Meta, StoryObj } from "@storybook/react-native"
import { LoadingView } from "../../app/components"
import { View } from "react-native"

const meta: Meta<void> = {
  title: "LoadingView",
  component: LoadingView,
}

export default meta

type Story = StoryObj<void>

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
        <LoadingView />
      </View>
    ),
  ],
}
