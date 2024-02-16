import { useQuery } from "@tanstack/react-query"
import api from "../api"
import { Photo } from "../types/photo"

export const useGetSavedPhotos = () => {
  return useQuery({
    queryKey: ["saved-photos"],
    queryFn: (): Promise<Photo[]> => {
      return Promise.resolve(api.getSaved())
    },
  })
}
