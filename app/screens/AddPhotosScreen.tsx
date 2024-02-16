import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, PhotosList, Screen, type ScreenProps } from "app/components"
import { type AppStackParamList } from "app/navigators"
import { spacing } from "app/theme"
import { Suspense, useState } from "react"
import { View, type ViewStyle } from "react-native"
import { useGetAvailablePhotos } from "../hooks/useGetAvailablePhotos"
import { xor } from "lodash"
import { LoadingView } from "../components/molecules/LoadingView"
import { ErrorBoundary } from "react-error-boundary"
import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorView } from "../components/molecules/ErrorView"

/**
 * An inner view for the AddPhotosScreen that contains the
 * list of available photos and a button to add the selected
 * photos to the user's profile.
 *
 * Utilizes the suspense API to show a loading view while the photos are loaded
 * @constructor
 */
function AddPhotoListView() {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const { data: photos } = useGetAvailablePhotos()
  return (
    <View style={$innerContainer}>
      <PhotosList
        selectedPhotos={selectedPhotos}
        style={$photosList}
        photos={photos}
        onPhotoPress={(photo) => {
          setSelectedPhotos((selectedPhotos) => xor(selectedPhotos, [photo.id]))
        }}
      />

      <Button
        style={$buttonPadding}
        tx="addPhotosScreen.addSelected"
        disabled={!selectedPhotos.length}
      />
    </View>
  )
}

export function AddPhotosScreen({
  navigation,
  route,
}: NativeStackScreenProps<AppStackParamList, "AddPhotos">) {
  return (
    <Screen contentContainerStyle={$screen} safeAreaEdges={["top"]}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={(props) => <ErrorView {...props} />}>
            <Suspense fallback={<LoadingView />}>
              <AddPhotoListView />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
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
