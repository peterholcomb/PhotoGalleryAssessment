import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api"

export const useAddPhotos = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => {
      return api.add(ids)
    },
    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.resetQueries()
    },
  })
}
