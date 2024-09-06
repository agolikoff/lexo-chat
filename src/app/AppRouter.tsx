import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import { PrivateLayout, AuthLayout } from "../layouts";
import { SignIn } from "../pages";
import { Settings, Lexo, Chat, Function1, LastChats } from "../pages/lk";
import { UnderConstruction } from "../shared/components";
import { AppRoutes } from "../shared/constants/routes";
import { PropsWithChildren } from "react";
import { useAppSelector } from "../shared/hooks";
import { isAuthSelector } from "../store/auth";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuth = useAppSelector(isAuthSelector);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={AppRoutes.SIGN_IN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to={AppRoutes.LK_HOME} />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate replace to={AppRoutes.SIGN_IN} />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <UnderConstruction />,
      },
    ],
  },
  {
    path: "lk",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Navigate replace to={AppRoutes.LK_SETTINGS} />,
      },
      {
        path: "chat",
        children: [
          {
            index: true,
            path: "",
            element: (
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            ),
          },
          {
            index: true,
            path: "last",
            element: (
              <ProtectedRoute>
                <LastChats />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "lexo",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <Lexo />
              </ProtectedRoute>
            ),
          },
          {
            path: "function1",
            element: (
              <ProtectedRoute>
                <Function1 />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={routes} />;
}
