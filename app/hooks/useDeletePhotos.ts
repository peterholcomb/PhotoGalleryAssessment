import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api"

export const useDeletePhotos = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => {
      return api.remove(ids)
    },
    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.resetQueries()
    },
  })
}
