import { Photo } from "../../types/photo"
import {
  Image,
  PressableProps,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  View,
  Platform,
  Pressable,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors, spacing } from "../../theme"
import compose = StyleSheet.compose
import { useState } from "react"

export interface PhotoItemProps extends Omit<PressableProps, "onPress"> {
  item: Photo
  isSelectable?: boolean
  isSelected?: boolean
  onPress?: (item: Photo) => void
}

export const PhotoItem = ({ item, isSelected, isSelectable, onPress, ...rest }: PhotoItemProps) => {
  const [$calculatedImage, setCalculatedImage] = useState<ImageStyle>()
  const onLayout = (event) => {
    const containerWidth = event.nativeEvent.layout.width

    /**
     * Set the width/height to be the size of the container if the image is larger than the container
     * @param fullWidth
     * @param fullHeight
     */
    const updateImageSize = (fullWidth, fullHeight) => {
      if (containerWidth && containerWidth < fullWidth) {
        setCalculatedImage({
          width: containerWidth,
          height: fullHeight / (fullWidth / containerWidth),
        })
      } else {
        setCalculatedImage({ width: fullWidth, height: fullHeight })
      }
    }

    if (Platform.OS === "web") {
      Image.getSize(item.photo as string, (width, height) => {
        updateImageSize(width, height)
      })
    } else {
      const source = Image.resolveAssetSource(item.photo)
      updateImageSize(source.width, source.height)
    }
  }

  if (!onPress) {
    return (
      <View style={$container} {...rest} onLayout={onLayout}>
        <Image source={item.photo} style={$calculatedImage} resizeMode="cover" />
      </View>
    )
  }

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0, ...$container }]}
      onPress={() => onPress(item)}
      {...rest}
      onLayout={onLayout}
    >
      <Image source={item.photo} style={$calculatedImage} resizeMode="cover" />
      {isSelectable && (
        <AntDesign
          name={isSelected ? "checkcircle" : "checkcircleo"}
          size={24}
          color={isSelected ? colors.palette.success300 : colors.palette.neutral200}
          style={compose($baseCheck, { opacity: isSelected ? 1 : 0.5 })}
        />
      )}
    </Pressable>
  )
}
const $container: ViewStyle = {
  flex: 0.5,
  justifyContent: "center",
  alignItems: "center",
  margin: spacing.xxs,
}
const $baseCheck: ViewStyle = {
  position: "absolute",
  top: spacing.xs,
  right: spacing.xs,
}
