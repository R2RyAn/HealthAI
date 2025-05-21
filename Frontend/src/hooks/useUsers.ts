import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, User } from "../lib/api";

// Fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get<User[]>("/person");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Fetch single user
export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await api.get<User>(`/person/${id}`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, user }: { id: number; user: Partial<User> }) => {
      const { data } = await api.put<User>(`/person/${id}`, user);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/person/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
