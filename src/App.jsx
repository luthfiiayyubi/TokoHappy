import { AppProvider, useApp } from "./context/AppContext";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";

function Router() {
  const { page } = useApp();
  if (page === "login") return <LoginPage />;
  if (page === "products") return <ProductsPage />;
  if (page === "checkout") return <CheckoutPage />;
  if (page === "admin") return <AdminPage />;
  return <AboutPage />;
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
