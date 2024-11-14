import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AntdConfigProvider } from "@repo/configs";
import "@repo/configs/axios.config";
import "@repo/ui/assets/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./utils/hooks/useAuth";

const root = document.getElementById("root-ge") as HTMLDivElement;
ReactDOM.createRoot(root).render(
  <AuthProvider>
    <QueryClientProvider client={new QueryClient()}>
      <AntdConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdConfigProvider>
    </QueryClientProvider>
  </AuthProvider>
);
