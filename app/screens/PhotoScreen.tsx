import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { PhotoItem, Screen } from "app/components"
import { type AppStackParamList } from "app/navigators"
import { SafeAreaView } from "react-native"
import React from "react"
import { SuspenseLoader } from "../components/organisms/SuspenseLoader"
import { useGetSavedPhotos } from "../hooks/useGetSavedPhotos"
import * as $commonStyles from "./CommonStyles"

/**
 * An inner view for the PhotosScreen that contains the
 * list of saved photos and a button to edit the selected
 * photos to the user's profile.
 *
 * Utilizes the suspense API to show a loading view while the photos are loaded
 * @constructor
 */
function SinglePhotoView({ route }: NativeStackScreenProps<AppStackParamList, "Photos">) {
  const { data: photos } = useGetSavedPhotos()
  const photo = photos?.find((photo) => photo.id === route?.params?.photoId)
  return (
    <SafeAreaView style={$commonStyles.$innerContainer}>
      <PhotoItem item={photo} />
    </SafeAreaView>
  )
}

export function PhotoScreen(props: NativeStackScreenProps<AppStackParamList, "Photos">) {
  return (
    <Screen contentContainerStyle={$commonStyles.$screen} safeAreaEdges={["top"]}>
      <SuspenseLoader>
        <SinglePhotoView {...props} />
      </SuspenseLoader>
    </Screen>
  )
}
