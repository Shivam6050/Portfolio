/**
 * Browser entry: mounts React into index.html root, installs AppProvider, and imports global CSS. Add app-wide providers here. StrictMode exercises effect setup/cleanup again in development; keep cleanup safe.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import React from "react";
/* Import ReactDOM from react-dom/client; use its public API here rather than modifying installed dependency files. */
import ReactDOM from "react-dom/client";
/* Import App from ./App.jsx; edit that module for the shared implementation. */
import App from "./App.jsx";
/* Import AppProvider from ./context/AppContext.jsx; edit that module for the shared implementation. */
import { AppProvider } from "./context/AppContext.jsx";
/* Import side effects from ./index.css; edit that module for the shared implementation. */
import "./index.css";

/* Create the React root on index.html #root and render StrictMode > AppProvider > App. Keep the DOM ID synchronized. */
ReactDOM.createRoot(document.getElementById("root")).render(
  /* Development lifecycle checks; effects must support setup followed by cleanup/re-setup. */
  <React.StrictMode>
    {/* Make shared project/analytics/toast state available to descendants. */}<AppProvider>
      {/* Render App; edit its imported component for behavior instead of duplicating it here. */}<App />
    </AppProvider>
  </React.StrictMode>
);
