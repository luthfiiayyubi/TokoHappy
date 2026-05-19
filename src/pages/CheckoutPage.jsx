import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function CheckoutPage() {
  const { user, cart, totalPrice, clearCart, setPage } = useApp();
  const [form, setForm] = useState({
    username: user?.username || "",
    namaLengkap: "",
    noTelp: "",
    email: "",
    alamat: "",
    noRekening: "",
  });
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);

  function validate() {
    const e = {};
    if (!form.username.trim()) e.username = "Username wajib diisi.";
    if (!form.namaLengkap.trim()) e.namaLengkap = "Nama lengkap wajib diisi.";
    if (!form.noTelp.trim()) e.noTelp = "Nomor telepon wajib diisi.";
    if (!form.email.trim()) e.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format email tidak valid.";
    if (!form.alamat.trim()) e.alamat = "Alamat rumah wajib diisi.";
    if (!form.noRekening.trim()) e.noRekening = "Nomor rekening wajib diisi.";
    return e;
  }

  function handleChange(field, val) {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setPopup({
      namaLengkap: form.namaLengkap,
      totalPrice,
    });
  }

  function handleClosePopup() {
    clearCart();
    setPage("about");
  }

  const fields = [
    { key: "username", label: "Username", placeholder: "Username kamu", type: "text" },
    { key: "namaLengkap", label: "Nama Lengkap", placeholder: "Nama lengkapmu", type: "text" },
    { key: "noTelp", label: "Nomor Telepon", placeholder: "08xxxxxxxxxx", type: "tel" },
    { key: "email", label: "Alamat Email", placeholder: "email@example.com", type: "email" },
    { key: "alamat", label: "Alamat Rumah", placeholder: "Jl. Contoh No. 1, Kota", type: "text" },
    { key: "noRekening", label: "Nomor Rekening", placeholder: "xxxx-xxxx-xxxx", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setPage("products")}
            className="font-['DM_Sans'] text-sm text-[#8C8C8C] hover:text-[#1A1A1A] flex items-center gap-2 transition-colors"
          >
            ← Kembali ke Produk
          </button>
          <span className="font-['Playfair_Display'] text-xl font-bold text-[#1A1A1A]">
            Toko<span className="text-[#E07B39]">Happy</span>
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="font-['DM_Mono'] text-xs tracking-[0.2em] text-[#E07B39] uppercase mb-1">Langkah Terakhir</p>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1A1A1A]">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6">
              <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A1A1A] mb-5">Data Pemesan</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {fields.map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-1.5 block">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => handleChange(key, e.target.value)}
                      placeholder={placeholder}
                      className={`w-full border rounded-xl px-4 py-3 font-['DM_Sans'] text-sm text-[#1A1A1A] bg-[#FAF7F2] focus:outline-none transition-colors placeholder:text-[#C4BFB7] ${
                        errors[key] ? "border-red-300 focus:border-red-400" : "border-[#E5E0D8] focus:border-[#E07B39]"
                      }`}
                    />
                    {errors[key] && (
                      <p className="font-['DM_Sans'] text-xs text-red-500 mt-1">{errors[key]}</p>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-[#E07B39] text-white font-['DM_Sans'] font-medium py-3.5 rounded-xl text-sm hover:bg-[#c96928] transition-colors mt-2"
                >
                  Konfirmasi Pesanan →
                </button>
              </form>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sticky top-24">
              <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A1A1A] mb-4">Ringkasan Pesanan</h2>
              <div className="flex flex-col gap-3 mb-5 max-h-60 overflow-y-auto">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F0EDE8] rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={product.images?.[0] || "https://placehold.co/80x80"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://placehold.co/80x80"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['DM_Sans'] text-xs text-[#1A1A1A] line-clamp-1">{product.title}</p>
                      <p className="font-['DM_Mono'] text-xs text-[#8C8C8C]">×{qty}</p>
                    </div>
                    <span className="font-['DM_Mono'] text-xs text-[#1A1A1A]">${product.price * qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E5E0D8] pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-['DM_Sans'] text-sm text-[#8C8C8C]">Total Pembayaran</span>
                  <span className="font-['Playfair_Display'] text-2xl font-bold text-[#E07B39]">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl animate-scaleIn text-center" style={{ animationFillMode: "forwards" }}>
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A1A1A] mb-3">Pesanan Berhasil!</h3>
            <p className="font-['DM_Sans'] text-sm text-[#8C8C8C] leading-relaxed mb-6">
              Transaction success by <strong className="text-[#1A1A1A]">{popup.namaLengkap}</strong> with total price{" "}
              <strong className="text-[#E07B39]">${popup.totalPrice.toLocaleString()}</strong>.
            </p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-[#E07B39] text-white font-['DM_Sans'] font-medium py-3 rounded-xl text-sm hover:bg-[#c96928] transition-colors"
            >
              Oke, Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
