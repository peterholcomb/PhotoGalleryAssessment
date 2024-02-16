import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, PhotosList, Screen } from "app/components"
import { AppStackParamList } from "app/navigators"
import { colors } from "app/theme"
import React, { useState } from "react"
import { ActivityIndicator, SafeAreaView, View } from "react-native"
import { xor } from "lodash"
import { useDeletePhotos } from "../hooks/useDeletePhotos"
import { SuspenseLoader } from "../components/organisms/SuspenseLoader"
import { useGetSavedPhotos } from "../hooks/useGetSavedPhotos"
import * as $commonStyles from "./CommonStyles"

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
    <SafeAreaView style={$commonStyles.$innerContainer}>
      <PhotosList
        isSelectable={isDeleting}
        selectedPhotos={selectedPhotos}
        style={$commonStyles.$photosList}
        photos={photos}
        onPhotoPress={(photo) => {
          setSelectedPhotos((selectedPhotos) => xor(selectedPhotos, [photo.id]))
        }}
      />

      <View style={$commonStyles.$buttons}>
        <Button
          style={$commonStyles.$button}
          preset={isDeleting ? "reversed" : "default"}
          tx={isDeleting ? "editPhotosScreen.cancel" : "editPhotosScreen.select"}
          onPress={() => {
            setSelectedPhotos([])
            setIsDeleting(!isDeleting)
          }}
        />
        <Button
          style={$commonStyles.$button}
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
    <Screen contentContainerStyle={$commonStyles.$screen} safeAreaEdges={["top"]}>
      <SuspenseLoader>
        <EditPhotoListView {...props} />
      </SuspenseLoader>
    </Screen>
  )
}
