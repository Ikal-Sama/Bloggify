import { checkAuth } from "@/actions/AuthActions";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const { data, isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: checkAuth,
    staleTime: 0, // ✅ Always fetch fresh auth data
    cacheTime: 0, // ✅ Prevent old auth state from persisting
    refetchOnWindowFocus: true,
    retry: false, // Don't retry failed requests
  });

  if (isLoading) return <div>Loading...</div>;

  return data?.authenticated ? <Outlet /> : <Navigate to='/login' replace />;
}
