import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Feed from "./features/Feed/Feed";
import { Notifications, Profile, Settings } from "./features/Feed/OtherPages";

export default function App() {
  const routes = createBrowserRouter([
    { index: true, element: <Home></Home> },
    { path: "/feed", element: <Feed /> },
    { path: "/profile", element: <Profile /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/settings", element: <Settings /> },
    { path: "*", element: <Home /> },
  ]);

  return (
    <div className="app-root">
      <ToastContainer></ToastContainer>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}
