import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Suspense shows a tiny fallback while lazy routes load */}
    <Suspense fallback={<div className="p-4 text-white">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
