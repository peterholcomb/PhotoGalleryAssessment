import { useSuspenseQuery } from "@tanstack/react-query"
import api from "../api"
import { Photo } from "../types/photo"

export const QUERY_KEY_AVAILABLE_PHOTOS = "available-photos"
export const useGetAvailablePhotos = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY_AVAILABLE_PHOTOS],
    queryFn: (): Promise<Photo[]> => {
      return api.getAvailable()
    },
  })
}
