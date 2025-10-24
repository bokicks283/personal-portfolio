import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("./components/HomePage"));         // adjust path
const BenchPage = lazy(() => import("./benchmark/BenchPage"));       // your A/B page
const Root = lazy(() => import("./components/Root"));                        // layout w/ <Outlet/>        // optional

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "bench", element: <BenchPage /> },
      {
        path: "*", element: (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-semibold">404</h1>
            <p className="mt-2 text-neutral-300">That page wasn't found.</p>
          </div>
        )
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
