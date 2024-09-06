import { Outlet } from "react-router-dom";
import { useAuth } from "../shared/hooks";

export function AuthLayout() {
  useAuth();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
}
