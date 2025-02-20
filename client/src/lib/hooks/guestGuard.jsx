import { checkAuth } from "@/actions/AuthActions";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestGuard() {
  const { data, isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: checkAuth,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });

  return data?.authenticated ? <Navigate to='/' replace /> : <Outlet />;
}
