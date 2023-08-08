import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    console.log("chay vao day a`");
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
