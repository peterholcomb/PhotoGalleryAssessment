import { Meta, StoryObj } from "@storybook/react-native"
import { PhotoItem, PhotoItemProps } from "../../app/components"
import { View } from "react-native"
import photos from "../../assets/photos"

const meta: Meta<PhotoItemProps> = {
  title: "PhotoItem",
  component: PhotoItem,
  args: {
    item: photos[0],
    showFull: true,
    onPress: () => {
      alert("pressed")
    },
  },
}

export default meta

type Story = StoryObj<PhotoItemProps>

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
