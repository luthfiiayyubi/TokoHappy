import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const API = "https://api.escuelajs.co/api/v1/products";

function CartSidebar({ open, onClose }) {
  const { cart, removeFromCart, totalPrice, setPage } = useApp();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#FAF7F2] w-full max-w-sm h-full flex flex-col shadow-2xl animate-slideRight" style={{ animationFillMode: "forwards" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D8]">
          <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A1A1A]">Keranjang</h2>
          <button onClick={onClose} className="text-[#8C8C8C] hover:text-[#1A1A1A] text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center mt-16">
              <div className="text-5xl mb-4">🛒</div>
              <p className="font-['DM_Sans'] text-sm text-[#8C8C8C]">Keranjang masih kosong</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 items-start bg-white border border-[#E5E0D8] rounded-xl p-4">
                  <img
                    src={product.images?.[0] || "https://placehold.co/80x80"}
                    alt={product.title}
                    className="w-14 h-14 object-cover rounded-lg bg-[#F0EDE8] flex-shrink-0"
                    onError={(e) => { e.target.src = "https://placehold.co/80x80"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-['DM_Sans'] text-sm font-medium text-[#1A1A1A] leading-snug line-clamp-2">{product.title}</p>
                    <p className="font-['DM_Mono'] text-xs text-[#E07B39] mt-1">${product.price} × {qty}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-[#C4BFB7] hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E5E0D8]">
            <div className="flex justify-between items-center mb-4">
              <span className="font-['DM_Sans'] text-sm text-[#8C8C8C]">Total</span>
              <span className="font-['Playfair_Display'] text-xl font-bold text-[#1A1A1A]">${totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={() => { onClose(); setPage("checkout"); }}
              className="w-full bg-[#E07B39] text-white font-['DM_Sans'] font-medium py-3.5 rounded-xl text-sm hover:bg-[#c96928] transition-colors"
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddToCartModal({ product, onClose }) {
  const { addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  function handleAdd() {
    if (!qty || qty <= 0) {
      setMsg("Jumlah harus lebih dari 0.");
      return;
    }
    addToCart(product, qty);
    setMsg("Berhasil ditambahkan ke keranjang! ✓");
    setTimeout(onClose, 1000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scaleIn" style={{ animationFillMode: "forwards" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8C8C8C] hover:text-[#1A1A1A]">✕</button>
        <img
          src={product.images?.[0] || "https://placehold.co/300x200"}
          alt={product.title}
          className="w-full h-40 object-cover rounded-xl mb-4 bg-[#F0EDE8]"
          onError={(e) => { e.target.src = "https://placehold.co/300x200"; }}
        />
        <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A1A1A] mb-1">{product.title}</h3>
        <p className="font-['DM_Mono'] text-sm text-[#E07B39] mb-4">${product.price}</p>

        <label className="font-['DM_Sans'] text-xs text-[#8C8C8C] uppercase tracking-wider mb-2 block">Jumlah</label>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-full border border-[#E5E0D8] flex items-center justify-center hover:bg-[#F0EDE8] text-sm"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            className="w-16 text-center border border-[#E5E0D8] rounded-lg py-2 font-['DM_Sans'] text-sm focus:outline-none focus:border-[#E07B39]"
          />
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-9 h-9 rounded-full border border-[#E5E0D8] flex items-center justify-center hover:bg-[#F0EDE8] text-sm"
          >
            +
          </button>
        </div>

        {msg && <p className="font-['DM_Sans'] text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2 mb-3">{msg}</p>}

        <button
          onClick={handleAdd}
          className="w-full bg-[#E07B39] text-white font-['DM_Sans'] font-medium py-3 rounded-xl text-sm hover:bg-[#c96928] transition-colors"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { user, logout, cartCount, setPage } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}?limit=20&offset=0`)
      .then(r => r.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  function getImg(p) {
    try {
      const img = p.images?.[0];
      if (!img) return "https://placehold.co/400x300";
      // platzi api sometimes wraps in JSON array string
      if (img.startsWith("[")) return JSON.parse(img)[0];
      return img;
    } catch {
      return "https://placehold.co/400x300";
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setPage("about")}
            className="font-['Playfair_Display'] text-xl font-bold text-[#1A1A1A] hover:text-[#E07B39] transition-colors"
          >
            Toko<span className="text-[#E07B39]">Happy</span>
          </button>

          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="hidden md:block flex-1 max-w-xs border border-[#E5E0D8] rounded-full px-4 py-2 text-sm font-['DM_Sans'] bg-white focus:outline-none focus:border-[#E07B39] transition-colors"
          />

          <div className="flex items-center gap-3">
            <span className="font-['DM_Sans'] text-xs text-[#8C8C8C] hidden sm:block">
              Hai, <strong className="text-[#1A1A1A]">{user?.username}</strong>
            </span>
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-[#1A1A1A] text-[#FAF7F2] rounded-full px-4 py-2 text-sm font-['DM_Sans'] hover:bg-[#E07B39] transition-colors"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E07B39] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-['DM_Mono']">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="font-['DM_Sans'] text-xs text-[#8C8C8C] hover:text-red-500 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
        {/* Mobile search */}
        <div className="md:hidden px-6 pb-3">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-[#E5E0D8] rounded-full px-4 py-2 text-sm font-['DM_Sans'] bg-white focus:outline-none focus:border-[#E07B39]"
          />
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <p className="font-['DM_Mono'] text-xs tracking-[0.2em] text-[#E07B39] uppercase mb-1">Semua Produk</p>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1A1A1A]">
          Pilih Produk Favoritmu
        </h1>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden animate-pulse">
                <div className="h-44 bg-[#F0EDE8]" />
                <div className="p-4">
                  <div className="h-4 bg-[#F0EDE8] rounded mb-2" />
                  <div className="h-3 bg-[#F0EDE8] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">😕</div>
            <p className="font-['DM_Sans'] text-[#8C8C8C]">Produk tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-44 bg-[#F0EDE8] overflow-hidden">
                  <img
                    src={getImg(product)}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://placehold.co/400x300"; }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-['DM_Sans'] text-xs text-[#8C8C8C] mb-1 uppercase tracking-wider">{product.category?.name}</p>
                  <h3 className="font-['Playfair_Display'] text-sm font-semibold text-[#1A1A1A] leading-snug flex-1 line-clamp-2 mb-3">{product.title}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-['DM_Mono'] text-sm font-medium text-[#E07B39]">${product.price}</span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-[#1A1A1A] text-[#FAF7F2] text-xs font-['DM_Sans'] px-3 py-1.5 rounded-full hover:bg-[#E07B39] transition-colors"
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      {selectedProduct && (
        <AddToCartModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
