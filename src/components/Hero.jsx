// import React, { useEffect, useState } from "react";

// const Hero = ({ title, subtitle, height = "100vh"  }) => {
//   // FIXED IMAGES (tetap, tidak berubah)
//   const images = [
//     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&w=800&q=80",
//   ];

//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <section
//       className={`relative flex items-center justify-center text-center text-white transition-all duration-700 ${height}`}
//       style={{
//         height: height,
//         backgroundImage: `url(${images[currentImage]})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/60"></div>

//       <div className="relative z-10 max-w-2xl px-4">
//         <h1 className="mb-4 text-5xl font-bold">{title}</h1>
//         <p className="text-lg text-gray-200">{subtitle}</p>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/services/AuthService";

const Hero = ({ title, subtitle, height = "100vh", showButton = true }) => {
  const navigate = useNavigate();
  const images = [
    // "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    // "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    // "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&w=1200&q=80",
    "https://i.pinimg.com/1200x/0c/5e/8f/0c5e8f532ef7832742310311f24f409b.jpg",
    "https://i.pinimg.com/736x/39/ee/cb/39eecbeca86920e153e277780f20feed.jpg",
    "https://i.pinimg.com/1200x/05/c0/03/05c0037c417573e6c4e6074cadf3dfe9.jpg",
    "https://i.pinimg.com/736x/27/b2/5a/27b25a3fbb540e6b0370a91b2da2ad55.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleStartAction = () => {
    if (isLoggedIn()) {
      // Mencari elemen upcoming-events di halaman
      const element = document.getElementById("upcoming-events");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // Jika elemen tidak ditemukan (misal sedang di halaman lain), arahkan ke home
        navigate("/");
      }
    } else {
      // Jika belum login, arahkan ke registrasi
      navigate("/register");
    }
  };

  return (
    <section
      className={`relative flex items-center justify-center text-center text-white overflow-hidden transition-all duration-1000 h-200 ${height}`}
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay Gelap dengan Gradien Navy agar teks mudah dibaca */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0a121e]/90 via-gray-900/60 to-[#0a121e]"></div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6">
        {/* Badge Animasi */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full bg-blue-600/20 backdrop-blur-md border-blue-500/30 animate-pulse">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-black text-blue-200 uppercase tracking-[0.2em]">
            Pusat Sertifikasi Digital
          </span>
        </div>

        {/* Judul dengan Gradien */}
        <h1 className="mb-6 text-6xl font-black leading-none tracking-tighter md:text-8xl">
          {title.split(" ")[0]} <br />
          <span className="text-transparent bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text">
            {title.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Subtitle / Deskripsi */}
        <p className="max-w-2xl mx-auto mb-6 text-lg italic leading-relaxed text-gray-300 md:text-xl">
          "{subtitle}"
        </p>

        {/* INDIKATOR SLIDESHOW - Sekarang terletak di bawah subtitle */}
        <div className="flex gap-2 mb-10">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentImage === idx ? "w-8 bg-blue-500" : "w-2 bg-gray-600/50"
              }`}
            />
          ))}
        </div>

        {/* Tombol Aksi */}
        {showButton && (
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              onClick={handleStartAction}
              className="flex items-center gap-3 px-10 py-4 font-black text-white transition-all bg-blue-600 shadow-2xl cursor-pointer group hover:bg-blue-500 rounded-2xl shadow-blue-600/40 active:scale-95"
            >
              Mulai Sekarang
              <ArrowRight className="transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;