import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./src/pages/Home";
import LeaderboardPage from "./src/pages/LeaderBoardPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/leaderboard", element: <LeaderboardPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
