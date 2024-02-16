import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, ButtonProps, PhotosList, Screen, ScreenProps } from "app/components"
import { AppStackParamList } from "app/navigators"
import { colors, spacing } from "app/theme"
import React, { useState } from "react"
import { ActivityIndicator, SafeAreaView, View, ViewStyle } from "react-native"
import { xor } from "lodash"
import { useDeletePhotos } from "../hooks/useDeletePhotos"
import { SuspenseLoader } from "../components/organisms/SuspenseLoader"
import { useGetSavedPhotos } from "../hooks/useGetSavedPhotos"

/**
 * An inner view for the AddPhotosScreen that contains the
 * list of available photos and a button to add the selected
 * photos to the user's profile.
 *
 * Utilizes the suspense API to show a loading view while the photos are loaded
 * @constructor
 */
function EditPhotoListView({ navigation }: NativeStackScreenProps<AppStackParamList, "Photos">) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const { data: photos } = useGetSavedPhotos()
  const { isPending, mutateAsync } = useDeletePhotos()

  const navigateToAddPhotos = () => {
    navigation.navigate("AddPhotos")
  }
  const handleDeletePhotos = async () => {
    if (!isPending) {
      await mutateAsync(selectedPhotos)
      navigation.popToTop()
    }
  }
  return (
    <SafeAreaView style={$innerContainer}>
      <PhotosList
        isSelectable={isDeleting}
        selectedPhotos={selectedPhotos}
        style={$photosList}
        photos={photos}
        onPhotoPress={(photo) => {
          setSelectedPhotos((selectedPhotos) => xor(selectedPhotos, [photo.id]))
        }}
      />

      <View style={$buttons}>
        <Button
          style={$button}
          preset={isDeleting ? "reversed" : "default"}
          tx={isDeleting ? "editPhotosScreen.cancel" : "editPhotosScreen.select"}
          onPress={() => {
            setSelectedPhotos([])
            setIsDeleting(!isDeleting)
          }}
        />
        <Button
          style={$button}
          LeftAccessory={(props) =>
            isPending && <ActivityIndicator color={colors.palette.accent100} {...props} />
          }
          preset={isDeleting ? "danger" : "default"}
          tx={isDeleting ? "editPhotosScreen.delete" : "editPhotosScreen.add"}
          onPress={isDeleting ? handleDeletePhotos : navigateToAddPhotos}
        />
      </View>
    </SafeAreaView>
  )
}

export function EditPhotosScreen(props: NativeStackScreenProps<AppStackParamList, "Photos">) {
  return (
    <Screen contentContainerStyle={$screen} safeAreaEdges={["top"]}>
      <SuspenseLoader>
        <EditPhotoListView {...props} />
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

const $buttons: ViewStyle = {
  flexDirection: "row",
  gap: spacing.md,
  marginBottom: spacing.xl,
}

const $button: ButtonProps["style"] = {
  flex: 1,
}
