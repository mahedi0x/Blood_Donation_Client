import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "donor" } = useQuery({
    queryKey: ["users-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);

      return res.data?.role || "donor"; //API থেকে জাস্ট role আসতেছে(based on email)
    },
  });
  return { role, roleLoading };
};

export default useRole;
