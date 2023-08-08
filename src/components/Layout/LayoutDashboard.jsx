import { Outlet } from "react-router-dom";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

export default function LayoutDashboard() {
  console.log("LayoutDashboard");
  return (
    <div>
      <DashboardHeader />
      <Outlet />
    </div>
  );
}
