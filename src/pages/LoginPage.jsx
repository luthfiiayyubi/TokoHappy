import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { login, setPage } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username dan password tidak boleh kosong.");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const role = login(username.trim(), password);
      setLoading(false);
      if (role === "admin") {
        setPage("admin");
      } else {
        setPage("products");
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      {/* Back button */}
      <button
        onClick={() => setPage("about")}
        className="absolute top-6 left-6 font-['DM_Sans'] text-sm text-[#8C8C8C] hover:text-[#1A1A1A] flex items-center gap-2 transition-colors"
      >
        ← Kembali
      </button>

      <div className="w-full max-w-md animate-fadeUp" style={{ animationFillMode: "forwards" }}>
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#1A1A1A] mb-1">
            Toko<span className="text-[#E07B39]">Happy</span>
          </h1>
          <p className="font-['DM_Sans'] text-sm text-[#8C8C8C]">Masuk untuk mulai belanja</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-8 shadow-sm">
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1A1A1A] mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 font-['DM_Sans'] text-sm text-[#1A1A1A] bg-[#FAF7F2] focus:outline-none focus:border-[#E07B39] transition-colors placeholder:text-[#C4BFB7]"
              />
            </div>

            <div>
              <label className="font-['DM_Sans'] text-xs font-medium text-[#8C8C8C] uppercase tracking-wider mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full border border-[#E5E0D8] rounded-xl px-4 py-3 font-['DM_Sans'] text-sm text-[#1A1A1A] bg-[#FAF7F2] focus:outline-none focus:border-[#E07B39] transition-colors placeholder:text-[#C4BFB7]"
              />
            </div>

            {error && (
              <p className="font-['DM_Sans'] text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E07B39] text-white font-['DM_Sans'] font-medium py-3.5 rounded-xl text-sm hover:bg-[#c96928] transition-all duration-300 disabled:opacity-60 mt-1"
            >
              {loading ? "Memproses..." : "Masuk →"}
            </button>
          </form>

          <p className="font-['DM_Mono'] text-xs text-[#C4BFB7] text-center mt-6">
            hint: admin / admin untuk panel admin
          </p>
        </div>
      </div>
    </div>
  );
}
