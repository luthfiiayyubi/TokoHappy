import { useApp } from "../context/AppContext";

export default function AboutPage() {
  const { setPage, user } = useApp();

  function handleShop() {
    if (user) {
      setPage("products");
    } else {
      setPage("login");
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1A1A] tracking-tight cursor-pointer"
          >
            Toko<span className="text-[#E07B39]">Happy</span>
          </span>
          <div className="flex gap-6 items-center">
            <span className="font-['DM_Sans'] text-sm text-[#1A1A1A] font-medium cursor-default">About</span>
            <button
              onClick={handleShop}
              className="font-['DM_Sans'] text-sm bg-[#1A1A1A] text-[#FAF7F2] px-5 py-2 rounded-full hover:bg-[#E07B39] transition-colors duration-300"
            >
              Mulai Belanja
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#E07B39]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-[#1A1A1A]/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <p
              className="font-['DM_Mono'] text-xs tracking-[0.25em] text-[#E07B39] uppercase mb-4 opacity-0-init animate-fadeIn"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Belanja lebih mudah, lebih hemat
            </p>
            <h1
              className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[#1A1A1A] mb-6 opacity-0-init animate-fadeUp"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Temukan <em className="text-[#E07B39] not-italic">Produk</em>{" "}
              Impianmu
            </h1>
            <p
              className="font-['DM_Sans'] text-base md:text-lg text-[#8C8C8C] leading-relaxed mb-10 max-w-md opacity-0-init animate-fadeUp"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              TokoHappy hadir untuk memudahkan kamu menemukan ribuan produk
              berkualitas dengan harga yang bersahabat. Mulai belanja sekarang
              dan rasakan kemudahannya!
            </p>
            <div
              className="flex gap-4 flex-wrap opacity-0-init animate-fadeUp"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <button
                onClick={handleShop}
                className="font-['DM_Sans'] font-medium bg-[#E07B39] text-white px-8 py-3.5 rounded-full text-sm hover:bg-[#c96928] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E07B39]/30"
              >
                Mulai Belanja →
              </button>
              <a
                href="#about-section"
                className="font-['DM_Sans'] font-medium border border-[#E5E0D8] text-[#1A1A1A] px-8 py-3.5 rounded-full text-sm hover:border-[#1A1A1A] transition-colors duration-300"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          {/* Right illustration */}
          <div className="flex justify-center items-center relative">
            <div className="animate-float">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Circle background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E07B39]/20 to-[#1A1A1A]/10" />
                {/* Big emoji / icon */}
                <div className="absolute inset-0 flex items-center justify-center text-9xl">
                  🛍️
                </div>
                {/* Badge floating */}
                <div className="absolute -top-4 -right-4 bg-[#E07B39] text-white rounded-2xl px-4 py-2 shadow-lg animate-scaleIn" style={{ animationDelay: "0.8s", animationFillMode: "forwards", opacity: 0 }}>
                  <span className="font-['DM_Mono'] text-xs font-medium">50+ Produk</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#1A1A1A] text-[#FAF7F2] rounded-2xl px-4 py-2 shadow-lg animate-scaleIn" style={{ animationDelay: "1s", animationFillMode: "forwards", opacity: 0 }}>
                  <span className="font-['DM_Mono'] text-xs font-medium">Harga Terjangkau</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-['DM_Mono'] text-xs tracking-widest text-[#8C8C8C]">scroll</span>
          <div className="w-px h-10 bg-[#8C8C8C] animate-pulse" />
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden py-5 border-y border-[#E5E0D8] bg-[#1A1A1A]">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <span key={idx} className="inline-flex gap-10 px-5">
              {["Belanja Hemat", "Produk Berkualitas", "Pengiriman Cepat", "Harga Terjangkau", "Ribuan Pilihan", "Belanja Aman", "Produk Terpercaya", "Kepuasan Pelanggan"].map((t, i) => (
                <span key={i} className="font-['DM_Mono'] text-xs tracking-[0.2em] uppercase text-[#FAF7F2]/60">
                  {t} <span className="text-[#E07B39] mx-4">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* About section */}
      <section id="about-section" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="font-['DM_Mono'] text-xs tracking-[0.25em] text-[#E07B39] uppercase mb-3">Tentang Kami</p>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1A1A1A]">
            Kenapa <em className="text-[#E07B39] not-italic">TokoHappy?</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Mudah Ditemukan",
              desc: "Ribuan produk dari berbagai kategori tersedia dalam satu platform. Cukup klik, pilih, dan beli."
            },
            {
              icon: "💸",
              title: "Harga Bersahabat",
              desc: "Kami berkomitmen memberikan harga yang kompetitif tanpa mengorbankan kualitas produk."
            },
            {
              icon: "🔒",
              title: "Transaksi Aman",
              desc: "Sistem keamanan kami memastikan setiap transaksi berjalan lancar dan terlindungi."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#E5E0D8] rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A1A1A] mb-3">{item.title}</h3>
              <p className="font-['DM_Sans'] text-sm text-[#8C8C8C] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50+", label: "Produk Tersedia" },
              { num: "5+", label: "Kategori" },
              { num: "1000+", label: "Pelanggan Puas" },
              { num: "24/7", label: "Layanan Aktif" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-['Playfair_Display'] text-4xl font-bold text-[#E07B39] mb-2">{s.num}</div>
                <div className="font-['DM_Sans'] text-sm text-[#FAF7F2]/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-br from-[#E07B39]/10 to-[#1A1A1A]/5 rounded-3xl p-16 border border-[#E5E0D8]">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Siap untuk Mulai?
          </h2>
          <p className="font-['DM_Sans'] text-[#8C8C8C] mb-8 max-w-md mx-auto">
            Bergabunglah dengan ribuan pelanggan yang sudah merasakan kemudahan belanja di TokoHappy.
          </p>
          <button
            onClick={handleShop}
            className="font-['DM_Sans'] font-medium bg-[#E07B39] text-white px-10 py-4 rounded-full text-sm hover:bg-[#c96928] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E07B39]/30"
          >
            Belanja Sekarang →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E0D8] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-['Playfair_Display'] text-xl font-bold">
            Toko<span className="text-[#E07B39]">Happy</span>
          </span>
          <span className="font-['DM_Mono'] text-xs text-[#8C8C8C]">© 2026 TokoHappy. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
