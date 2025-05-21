import { useQuery } from "@tanstack/react-query";
import { api, User } from "../lib/api";

const USER_ID = "3b40d84b-cb63-478e-bf64-68fa005eb391";

export const useUserData = () => {
  return useQuery({
    queryKey: ["user", USER_ID],
    queryFn: async () => {
      try {
        const { data } = await api.get<User>(`/person/${USER_ID}`);
        console.log("API Response:", data);
        return data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
