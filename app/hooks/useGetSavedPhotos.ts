import { useSuspenseQuery } from "@tanstack/react-query"
import api from "../api"
import { Photo } from "../types/photo"

export const QUERY_KEY_SAVED_PHOTOS = "saved-photos"
export const useGetSavedPhotos = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY_SAVED_PHOTOS],
    queryFn: (): Promise<Photo[]> => {
      return api.getSaved()
    },
  })
}
