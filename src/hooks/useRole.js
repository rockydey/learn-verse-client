import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxoisSecure from "./useAxoisSecure";

const useRole = () => {
  const { user } = useAuth();
  const axoisSecure = useAxoisSecure();
  const { data: userRole, isPending: roleLoading } = useQuery({
    queryKey: [user?.email, "userRole"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/users/${user.email}`);
      return res.data?.role;
    },
  });
  return [userRole, roleLoading];
};

export default useRole;
