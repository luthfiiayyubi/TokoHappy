import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const API = "https://api.escuelajs.co/api/v1/products";

const EMPTY_FORM = { title: "", price: "", description: "", categoryId: "1", images: "" };

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto" style={{ animationFillMode: "forwards" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A1A1A]">{title}</h3>
          <button onClick={onClose} className="text-[#8C8C8C] hover:text-[#1A1A1A] text-lg">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { logout, user, setPage } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user?.role !== "admin") {
      setPage("about");
    }
  }, [user, setPage]);


  useEffect(() => {
    loadProducts();
    fetch(`${API}/categories`)
      .then(r => r.json())
      .then(d => setCategories(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  function loadProducts() {
    setLoading(true);
    fetch(`${API}?limit=20&offset=0`)
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function validateForm() {
    const e = {};
    if (!form.title.trim()) e.title = "Judul produk wajib diisi.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Harga harus berupa angka positif.";
    if (!form.description.trim()) e.description = "Deskripsi wajib diisi.";
    return e;
  }

  async function handleAdd() {
    const e = validateForm();
    if (Object.keys(e).length > 0) { setFormErrors(e); return; }
    setSubmitting(true);
    try {
      const body = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        categoryId: Number(form.categoryId) || 1,
        images: form.images ? [form.images] : ["https://placehold.co/600x400"],
      };
      const res = await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.id) {
        setProducts(prev => [data, ...prev]);
        showToast("Produk berhasil ditambahkan!");
        setShowAdd(false);
        setForm(EMPTY_FORM);
      } else {
        showToast("Gagal menambahkan produk.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan.", "error");
    }
    setSubmitting(false);
  }

  async function handleEdit() {
    const e = validateForm();
    if (Object.keys(e).length > 0) { setFormErrors(e); return; }
    setSubmitting(true);
    try {
      const body = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        categoryId: Number(form.categoryId) || 1,
        images: form.images ? [form.images] : ["https://placehold.co/600x400"],
      };
      const res = await fetch(`${API}/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.id) {
        setProducts(prev => prev.map(p => p.id === data.id ? data : p));
        showToast("Produk berhasil diubah!");
        setEditProduct(null);
        setForm(EMPTY_FORM);
      } else {
        showToast("Gagal mengubah produk.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan.", "error");
    }
    setSubmitting(false);
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast("Produk berhasil dihapus!");
    } catch {
      showToast("Gagal menghapus produk.", "error");
    }
    setDeleteId(null);
  }

  function openEdit(product) {
    setForm({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      categoryId: product.category?.id || "1",
      images: product.images?.[0] || "",
    });
    setFormErrors({});
    setEditProduct(product);
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormErrors({});
    setShowAdd(true);
  }

  function getImg(p) {
    try {
      const img = p.images?.[0];
      if (!img) return "https://placehold.co/80x60";
      if (img.startsWith("[")) return JSON.parse(img)[0];
      return img;
    } catch { return "https://placehold.co/80x60"; }
  }

  const ProductForm = ({ onSubmit, btnLabel }) => (
    <div className="flex flex-col gap-4">
      {[
        { key: "title", label: "Judul Produk", placeholder: "Nama produk", type: "text" },
        { key: "price", label: "Harga ($)", placeholder: "Contoh: 99", type: "number" },
        { key: "images", label: "URL Gambar (opsional)", placeholder: "https://...", type: "url" },
      ].map(({ key, label, placeholder, type }) => (
        <div key={key}>
          <label className="font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-1.5 block">{label}</label>
          <input
            type={type}
            value={form[key]}
            onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); if (formErrors[key]) setFormErrors(p => ({ ...p, [key]: "" })); }}
            placeholder={placeholder}
            className={`w-full border rounded-xl px-4 py-2.5 font-['DM_Sans'] text-sm bg-[#FAF7F2] focus:outline-none transition-colors placeholder:text-[#C4BFB7] ${formErrors[key] ? "border-red-300" : "border-[#E5E0D8] focus:border-[#E07B39]"}`}
          />
          {formErrors[key] && <p className="text-xs text-red-500 mt-1 font-['DM_Sans']">{formErrors[key]}</p>}
        </div>
      ))}
      <div>
        <label className="font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-1.5 block">Kategori</label>
        <select
          value={form.categoryId}
          onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
          className="w-full border border-[#E5E0D8] rounded-xl px-4 py-2.5 font-['DM_Sans'] text-sm bg-[#FAF7F2] focus:outline-none focus:border-[#E07B39]"
        >
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          {categories.length === 0 && <option value="1">Others</option>}
        </select>
      </div>
      <div>
        <label className="font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-1.5 block">Deskripsi</label>
        <textarea
          value={form.description}
          onChange={e => { setForm(p => ({ ...p, description: e.target.value })); if (formErrors.description) setFormErrors(p => ({ ...p, description: "" })); }}
          placeholder="Deskripsi produk..."
          rows={3}
          className={`w-full border rounded-xl px-4 py-2.5 font-['DM_Sans'] text-sm bg-[#FAF7F2] focus:outline-none resize-none transition-colors placeholder:text-[#C4BFB7] ${formErrors.description ? "border-red-300" : "border-[#E5E0D8] focus:border-[#E07B39]"}`}
        />
        {formErrors.description && <p className="text-xs text-red-500 mt-1 font-['DM_Sans']">{formErrors.description}</p>}
      </div>
      <button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full bg-[#E07B39] text-white font-['DM_Sans'] font-medium py-3 rounded-xl text-sm hover:bg-[#c96928] transition-colors disabled:opacity-60 mt-1"
      >
        {submitting ? "Memproses..." : btnLabel}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#1A1A1A] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-['Playfair_Display'] text-xl font-bold text-white">
              Toko<span className="text-[#E07B39]">Happy</span>
            </span>
            <span className="font-['DM_Mono'] text-xs text-white/40 bg-white/10 px-3 py-1 rounded-full">Admin Panel</span>
          </div>
          <button
            onClick={logout}
            className="font-['DM_Sans'] text-xs text-white/60 hover:text-white transition-colors"
          >
            Keluar
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-['DM_Mono'] text-xs tracking-[0.2em] text-[#E07B39] uppercase mb-1">Manajemen</p>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#1A1A1A]">Daftar Produk</h1>
          </div>
          <button
            onClick={openAdd}
            className="bg-[#E07B39] text-white font-['DM_Sans'] font-medium px-5 py-2.5 rounded-full text-sm hover:bg-[#c96928] transition-colors flex items-center gap-2"
          >
            + Tambah Produk
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white border border-[#E5E0D8] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E0D8] bg-[#FAF7F2]">
                    <th className="text-left px-5 py-3 font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Produk</th>
                    <th className="text-left px-5 py-3 font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Kategori</th>
                    <th className="text-left px-5 py-3 font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Harga</th>
                    <th className="text-center px-5 py-3 font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, idx) => (
                    <tr key={p.id} className={`border-b border-[#E5E0D8] hover:bg-[#FAF7F2] transition-colors ${idx === products.length - 1 ? "border-0" : ""}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#F0EDE8] overflow-hidden flex-shrink-0">
                            <img
                              src={getImg(p)}
                              alt={p.title}
                              className="w-full h-full object-cover"
                              onError={e => { e.target.src = "https://placehold.co/80x60"; }}
                            />
                          </div>
                          <span className="font-['DM_Sans'] text-sm text-[#1A1A1A] line-clamp-1 max-w-[200px]">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-['DM_Sans'] text-xs text-[#8C8C8C] bg-[#F0EDE8] px-2.5 py-1 rounded-full">{p.category?.name || "—"}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-['DM_Mono'] text-sm text-[#E07B39] font-medium">${p.price}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="font-['DM_Sans'] text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-full hover:bg-[#E07B39] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(p.id)}
                            className="font-['DM_Sans'] text-xs border border-red-200 text-red-400 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="font-['DM_Sans'] text-sm text-[#8C8C8C]">Belum ada produk.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <Modal title="Tambah Produk Baru" onClose={() => setShowAdd(false)}>
          <ProductForm onSubmit={handleAdd} btnLabel="Tambah Produk" />
        </Modal>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <Modal title="Edit Produk" onClose={() => setEditProduct(null)}>
          <ProductForm onSubmit={handleEdit} btnLabel="Simpan Perubahan" />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scaleIn text-center" style={{ animationFillMode: "forwards" }}>
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A1A1A] mb-2">Hapus Produk?</h3>
            <p className="font-['DM_Sans'] text-sm text-[#8C8C8C] mb-5">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-[#E5E0D8] text-[#8C8C8C] font-['DM_Sans'] text-sm py-2.5 rounded-xl hover:bg-[#F0EDE8] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 text-white font-['DM_Sans'] text-sm py-2.5 rounded-xl hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg font-['DM_Sans'] text-sm animate-scaleIn ${toast.type === "error" ? "bg-red-500 text-white" : "bg-[#1A1A1A] text-white"}`} style={{ animationFillMode: "forwards" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
