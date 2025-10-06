import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.sass";
import App from "./App.tsx";

// Use basename only in production (for GitHub Pages)
const basename = import.meta.env.PROD ? "/Buy_You_Desire" : "";

//document.getElementById() 方法的返回類型是 HTMLElement | null，因為：
//如果找到對應的元素，返回該元素
//如果找不到對應的元素，返回 null
//使用 ! 告訴 TypeScript 編譯器："我確定這個值不會是 null 或 undefined"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
