import { useSuspenseQuery } from "@tanstack/react-query"
import api from "../api"
import { Photo } from "../types/photo"

export const useGetAvailablePhotos = () => {
  return useSuspenseQuery({
    queryKey: ["photos"],
    queryFn: (): Promise<Photo[]> => {
      return new Promise((resolve, reject) => {
        // Simulate a short delay to display the loading indicator
        setTimeout(() => {
          //resolve(api.getAvailable())
          reject(new Error("This is a test error"))
        }, 1000)
      })
    },
  })
}
