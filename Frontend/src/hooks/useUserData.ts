import { useQuery } from "@tanstack/react-query";
import { api, User } from "../lib/api";

export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await api.get<User>("/person/me");
        console.log("✅ User data loaded:", data);
        return data;
      } catch (error) {
        console.error("🚨 Error loading user data:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
