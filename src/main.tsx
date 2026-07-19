import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import "@/app/styles.css";
import { initPerformanceTracking, reportCustomMetric } from "@/shared/lib";

const appBootStart = performance.now();
initPerformanceTracking();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

requestAnimationFrame(() => {
  reportCustomMetric("APP_FIRST_FRAME_MS", performance.now() - appBootStart);
});
