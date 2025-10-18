import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import Layout from "./layout";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "tv", element: <Tv /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
