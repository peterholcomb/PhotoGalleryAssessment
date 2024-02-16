import photos from "assets/photos"
import { Photo } from "./types/photo"
import { uniq, without } from "lodash"
import AsyncStorage from "@react-native-async-storage/async-storage"

const PHOTOS_KEY = "photos"

/**
 * ! NOTE: We aren't prescribing any particular solution for persistence
 * ! here, but users should be able to quit and relaunch the app
 * ! without losing all of their saved photos. In React Native for mobile,
 * ! you'll typically want to use AsyncStorage for this, and in web you'll
 * ! likely want to use LocalStorage. However, feel free to do
 * ! your own thing. It's also fine to layer your interactions with
 * ! persisted storage beneath a state management library.
 */

/**
 * This function should simply return all available photos
 * @returns All of the photos available for the user to add
 */
async function getAvailablePhotos(): Promise<Photo[]> {
  const currentPhotos = await getSavedPhotos()
  return photos.filter((photo) => !currentPhotos.find((p) => p.id === photo.id))
}

/**
 * This function should retrieve the user's currently saved photos
 */
async function getSavedPhotos(): Promise<Photo[]> {
  const storageEntry = JSON.parse((await AsyncStorage.getItem(PHOTOS_KEY)) ?? "[]")
  return storageEntry.map((id) => photos.find((photo) => photo.id === id))
}

/**
 * This function should add the specified photos to the user's saved photos
 * @param ids - An array of ids matching the photos that should be added
 */
async function addPhotos(ids: string[]): Promise<void> {
  const currentPhotos = await getSavedPhotos()
  await AsyncStorage.setItem(
    PHOTOS_KEY,
    JSON.stringify(uniq([...currentPhotos.map((photo) => photo.id), ...ids])),
  )
}

/**
 * This function should remove the specified photos from the user's saved photos
 * @param ids - An array of ids matching the photos that should be removed
 */
async function removePhotos(ids: string[]): Promise<void> {
  const currentPhotos = await getSavedPhotos()

  await AsyncStorage.setItem(
    PHOTOS_KEY,
    JSON.stringify(
      uniq(
        without(
          currentPhotos.map((photo) => photo.id),
          ...ids,
        ),
      ),
    ),
  )
}

export default {
  getAvailable: getAvailablePhotos,
  getSaved: getSavedPhotos,

  add: addPhotos,
  remove: removePhotos,
}
