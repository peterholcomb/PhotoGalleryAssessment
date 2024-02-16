import { Photo } from "../../types/photo"
import {
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors, spacing } from "../../theme"
import compose = StyleSheet.compose

const screenSize = Dimensions.get("window").width
export interface PhotoItemProps extends Omit<TouchableOpacityProps, "onPress"> {
  item: Photo
  isSelectable?: boolean
  isSelected?: boolean
  onPress: (item: Photo) => void
}

export const PhotoItem = ({ item, isSelected, isSelectable, onPress, ...rest }: PhotoItemProps) => {
  return (
    <TouchableOpacity style={$container} onPress={() => onPress(item)} {...rest}>
      <Image source={item.photo} style={$image} resizeMode="cover" />
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

const $image: ViewStyle = {
  width: screenSize / 2 - spacing.xs * 2,
  height: screenSize / 2 - spacing.xs * 2,
}
