import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role }
  const [cart, setCart] = useState([]);   // [{ product, qty }]
  const [page, setPage] = useState("about"); // about | login | products | admin | checkout

  function login(username, password) {
    if (username === "admin" && password === "admin") {
      setUser({ username, role: "admin" });
      return "admin";
    } else {
      setUser({ username, role: "member" });
      return "member";
    }
  }

  function logout() {
    setUser(null);
    setCart([]);
    setPage("about");
  }

  function addToCart(product, qty) {
    const q = parseInt(qty);
    if (!q || q <= 0) return false;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + q } : i
        );
      }
      return [...prev, { product, qty: q }];
    });
    return true;
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const totalPrice = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        user, login, logout,
        cart, addToCart, removeFromCart, clearCart,
        totalPrice, cartCount,
        page, setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
