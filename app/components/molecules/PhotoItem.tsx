import { Photo } from "../../types/photo"
import { TouchableOpacity, Image, TouchableOpacityProps, ViewStyle, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors, spacing } from "../../theme"
import compose = StyleSheet.compose

export interface PhotoItemProps extends Omit<TouchableOpacityProps, "onPress"> {
  item: Photo
  isSelectable?: boolean
  isSelected?: boolean
  onPress: (item: Photo) => void
}

export const PhotoItem = ({ item, isSelected, isSelectable, onPress, ...rest }: PhotoItemProps) => {
  return (
    <TouchableOpacity style={$container} onPress={() => onPress(item)} {...rest}>
      <Image source={{ uri: item.photo as string }} style={$image} resizeMode="center" />
      {isSelectable && (
        <AntDesign
          name={isSelected ? "checkcircle" : "checkcircleo"}
          size={24}
          color={isSelected ? colors.palette.success400 : colors.palette.neutral200}
          style={compose($baseCheck, { opacity: isSelected ? 1 : 0.5 })}
        />
      )}
    </TouchableOpacity>
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

const $image: ViewStyle = { aspectRatio: 1, width: "100%", height: 100 }
