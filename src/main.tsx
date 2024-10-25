import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n"; // Import this to initialize i18n
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
