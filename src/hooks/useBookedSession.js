import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxoisSecure from "./useAxoisSecure";

const useBookedSession = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
  const { data: bookedSessions = [] } = useQuery({
    queryKey: [user?.email, "booked-session"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/booked-session?email=${user.email}`);
      return res.data;
    },
  });

  return bookedSessions;
};

export default useBookedSession;
