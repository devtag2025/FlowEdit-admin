import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BroadcastService } from "@/services/broadcastService";
import toast from "react-hot-toast";

export const broadcastKeys = {
  all: ["broadcasts"],
  detail: (id) => ["broadcasts", id],
};

export function useBroadcasts() {
  return useQuery({
    queryKey: broadcastKeys.all,
    queryFn: BroadcastService.getAll,
  });
}

export function useBroadcast(id) {
  return useQuery({
    queryKey: broadcastKeys.detail(id),
    queryFn: () => BroadcastService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BroadcastService.create,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: broadcastKeys.all });
      toast.success(
        data.status === "scheduled"
          ? "Broadcast scheduled successfully!"
          : "Broadcast sent successfully!"
      );
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create broadcast.");
      console.error("Create broadcast failed:", error);
    },
  });
}

export function useUpdateBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => BroadcastService.update(id, updates),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: broadcastKeys.all });
      queryClient.invalidateQueries({ queryKey: broadcastKeys.detail(data.id) });
      toast.success("Broadcast updated successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update broadcast.");
    },
  });
}

export function useDeleteBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BroadcastService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: broadcastKeys.all });
      toast.success("Broadcast deleted.");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to delete broadcast.");
    },
  });
}