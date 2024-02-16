import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, PhotosList, Screen, type ScreenProps } from "app/components"
import { type AppStackParamList } from "app/navigators"
import { spacing } from "app/theme"
import { SafeAreaView, type ViewStyle } from "react-native"
import React from "react"
import { SuspenseLoader } from "../components/organisms/SuspenseLoader"
import { useGetSavedPhotos } from "../hooks/useGetSavedPhotos"

/**
 * An inner view for the PhotosScreen that contains the
 * list of saved photos and a button to edit the selected
 * photos to the user's profile.
 *
 * Utilizes the suspense API to show a loading view while the photos are loaded
 * @constructor
 */
function SavedPhotoListView({ navigation }: NativeStackScreenProps<AppStackParamList, "Photos">) {
  const { data: photos } = useGetSavedPhotos()
  const navigateToEditPhotos = () => {
    navigation.navigate("EditPhotos")
  }
  return (
    <SafeAreaView style={$innerContainer}>
      <PhotosList
        style={$photosList}
        photos={photos}
        onPhotoPress={(photo) => {
          console.log("pjh photo", photo)
        }}
      />
      <Button style={$buttonPadding} tx="photosScreen.edit" onPress={navigateToEditPhotos} />
    </SafeAreaView>
  )
}

export function PhotosScreen(props: NativeStackScreenProps<AppStackParamList, "Photos">) {
  return (
    <Screen contentContainerStyle={$screen} safeAreaEdges={["top"]}>
      <SuspenseLoader>
        <SavedPhotoListView {...props} />
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
