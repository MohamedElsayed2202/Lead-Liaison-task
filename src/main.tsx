import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./layout/main.layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import startWorker from "./server/worker.ts";
import IntersectionObserver from "./pages/IntersectionObserver.tsx";
import OffsetScroll from "./pages/OffsetScroll.tsx";
import InfiniteScrollComponent from "./pages/InfiniteScrollComponent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: IntersectionObserver,
      },
      { path: "offset-scroll", Component: OffsetScroll },
      { path: "infinite-scroll-component", Component: InfiniteScrollComponent },
    ],
  },
]);

const queryClient = new QueryClient();

startWorker().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
});
