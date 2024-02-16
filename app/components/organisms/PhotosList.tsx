import { FlatList, ViewProps, ViewStyle } from "react-native"
import { Photo } from "../../types/photo"
import { PhotoItem } from "../molecules/PhotoItem"

/**
 * This component should be responsible for rendering a
 * set of photos in a 2-column grid. Remember that it will
 * be used on three different screens, two of which require
 * the ability to select photos from those which are currently
 * being displayed.
 */
export type PhotoListProps = ViewProps & {
  photos: Photo[]
  numColumns?: number
  onPhotoPress?: (photo: Photo) => void
  selectedPhotos?: string[]
}

export function PhotosList({
  photos,
  onPhotoPress,
  numColumns = 2,
  selectedPhotos,
  ...rest
}: PhotoListProps) {
  return (
    <FlatList
      data={photos}
      columnWrapperStyle={$columnWrapper}
      renderItem={(props) => (
        <PhotoItem
          onPress={onPhotoPress}
          isSelected={selectedPhotos?.indexOf(props.item.id) >= 0}
          {...props}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      {...rest}
    />
  )
}

const $columnWrapper: ViewStyle = { justifyContent: "space-between" }
