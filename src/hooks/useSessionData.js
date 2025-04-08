import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxoisSecure from "./useAxoisSecure";

const useSessionData = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: [user?.email, "sessions"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/sessions/${user.email}`);
      return res.data;
    },
  });

  return [sessions, refetch];
};

export default useSessionData;
