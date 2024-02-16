import { Photo } from "../../types/photo"
import { TouchableOpacity, Image, TouchableOpacityProps, ViewStyle } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { spacing } from "../../theme"

export interface PhotoItemProps extends Omit<TouchableOpacityProps, "onPress"> {
  item: Photo
  isSelected?: boolean
  onPress: (item: Photo) => void
}

export const PhotoItem = ({ item, isSelected, onPress, ...rest }: PhotoItemProps) => {
  return (
    <TouchableOpacity style={$container} onPress={() => onPress(item)} {...rest}>
      <Image source={{ uri: item.photo as string }} style={$image} resizeMode="center" />
      {isSelected && <AntDesign name="checkcircle" size={24} color="green" />}
    </TouchableOpacity>
  )
}
const $container: ViewStyle = {
  flex: 0.5,
  justifyContent: "center",
  alignItems: "center",
  margin: spacing.xxs,
}
const $image: ViewStyle = { aspectRatio: 1, width: "100%", height: 100 }
