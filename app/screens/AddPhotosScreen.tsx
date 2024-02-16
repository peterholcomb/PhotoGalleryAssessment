import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, PhotosList, Screen, type ScreenProps } from "app/components"
import { type AppStackParamList } from "app/navigators"
import { colors, spacing } from "app/theme"
import React, { useState } from "react"
import { ActivityIndicator, SafeAreaView, type ViewStyle } from "react-native"
import { useGetAvailablePhotos } from "../hooks/useGetAvailablePhotos"
import { xor } from "lodash"
import { SuspenseLoader } from "../components/organisms/SuspenseLoader"
import { useAddPhotos } from "../hooks/useAddPhotos"

/**
 * An inner view for the AddPhotosScreen that contains the
 * list of available photos and a button to add the selected
 * photos to the user's profile.
 *
 * Utilizes the suspense API to show a loading view while the photos are loaded
 * @constructor
 */
function AddPhotoListView({ navigation }: NativeStackScreenProps<AppStackParamList, "AddPhotos">) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const { data: photos } = useGetAvailablePhotos()
  const { isPending, mutateAsync } = useAddPhotos()

  const handleAddPhotos = async () => {
    if (!isPending) {
      await mutateAsync(selectedPhotos)
      navigation.popToTop()
    }
  }
  return (
    <SafeAreaView style={$innerContainer}>
      <PhotosList
        isSelectable
        selectedPhotos={selectedPhotos}
        style={$photosList}
        photos={photos}
        onPhotoPress={(photo) => {
          setSelectedPhotos((selectedPhotos) => xor(selectedPhotos, [photo.id]))
        }}
      />

      <Button
        onPress={handleAddPhotos}
        LeftAccessory={(props) =>
          isPending && <ActivityIndicator color={colors.palette.accent100} {...props} />
        }
        style={$buttonPadding}
        tx="addPhotosScreen.addSelected"
        disabled={!selectedPhotos.length}
      />
    </SafeAreaView>
  )
}

export function AddPhotosScreen(props: NativeStackScreenProps<AppStackParamList, "AddPhotos">) {
  return (
    <Screen contentContainerStyle={$screen} safeAreaEdges={["top"]}>
      <SuspenseLoader>
        <AddPhotoListView {...props} />
      </SuspenseLoader>
    </Screen>
  )
}

const $screen: ScreenProps["contentContainerStyle"] = {
  flex: 1,
}

const $innerContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $photosList: ViewStyle = {
  flex: 1,
  marginBottom: spacing.sm,
}

const $buttonPadding: ViewStyle = {
  marginBottom: spacing.xl,
}
