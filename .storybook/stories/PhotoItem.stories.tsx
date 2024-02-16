import { Meta, StoryObj } from "@storybook/react-native"
import { PhotoItem, PhotoItemProps } from "../../app/components"
import { View } from "react-native"
import photos from "../../assets/photos"
import { useState } from "react"

const meta: Meta<PhotoItemProps> = {
  title: "PhotoItem",
  component: PhotoItem,
  args: {
    item: photos[0],
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

export const SelectableImage: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false)
    return (
      <PhotoItem
        item={photos[1]}
        isSelectable
        isSelected={isSelected}
        onPress={() => setIsSelected(!isSelected)}
      />
    )
  },
  decorators: [
    (Story) => {
      return (
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
      )
    },
  ],
}
