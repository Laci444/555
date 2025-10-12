import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Outlet } from "react-router";

export default function AuthProtectedRoute() {
	if (!useIsAuthenticated()) {
		throw new Response("Not found", {
			status: 404,
			statusText: "Not found",
		});
	}
	return <Outlet />;
}
