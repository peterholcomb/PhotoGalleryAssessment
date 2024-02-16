import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, Screen } from "app/components"
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
function SinglePhotoView({ navigation }: NativeStackScreenProps<AppStackParamList, "Photos">) {
  const { data: photos } = useGetSavedPhotos()
  const navigateToEditPhotos = () => {
    navigation.navigate("EditPhotos")
  }
  return (
    <SafeAreaView style={$commonStyles.$innerContainer}>
      <Button
        style={$commonStyles.$buttonPadding}
        tx="photosScreen.edit"
        onPress={navigateToEditPhotos}
      />
    </SafeAreaView>
  )
}

export function PhotosScreen(props: NativeStackScreenProps<AppStackParamList, "Photos">) {
  return (
    <Screen contentContainerStyle={$commonStyles.$screen} safeAreaEdges={["top"]}>
      <SuspenseLoader>
        <SinglePhotoView {...props} />
      </SuspenseLoader>
    </Screen>
  )
}
