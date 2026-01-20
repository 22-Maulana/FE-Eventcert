import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Star, Quote } from "lucide-react";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import { getEvents } from "../utils/services/EventService";

const HomePage = () => {
  const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png",
  ];

  const [events, setEvents] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents();
      const today = new Date().toISOString().split("T")[0];
      const upcoming = data.filter((event) => event.tanggal >= today);
      setEvents(upcoming);
    };
    fetchData();
  }, []);

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0a121e]">
      <Hero
        title="Welcome to CERT 2025"
        subtitle="Explore upcoming events and be part of something amazing!"
      />

      {/* ======================== UPCOMING EVENT ====================== */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Glow Decoration */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2"></div>

        <div className="container mx-auto max-w-[90%] relative">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="flex items-center gap-3 text-4xl font-black text-white">
                <Rocket className="w-8 h-8 text-blue-500" /> Upcoming Events
              </h3>
              <p className="mt-2 text-gray-400">
                Jangan lewatkan kesempatan berharga di event mendatang kami.
              </p>
            </div>

            {/* Custom Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => scroll(-400)}
                className="p-4 text-white transition-all border border-gray-700 shadow-lg bg-gray-800/50 hover:bg-blue-600 rounded-2xl active:scale-95"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll(400)}
                className="p-4 text-white transition-all border border-gray-700 shadow-lg bg-gray-800/50 hover:bg-blue-600 rounded-2xl active:scale-95"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 px-2 py-4 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {events.length === 0 ? (
              <div className="w-full py-20 text-center border border-gray-800 border-dashed bg-gray-900/40 rounded-4xl">
                <p className="font-medium text-gray-500">
                  Belum ada upcoming event saat ini.
                </p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="shrink-0 w-[380px]">
                  <EventCard event={event} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ======================== BENEFITS ====================== */}
      <section className="relative px-6 py-24 overflow-hidden bg-gray-950/50">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full"></div>

        <div className="container mx-auto max-w-[90%] relative">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-white">
              Why Choose <span className="text-blue-500">CERT</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Semua kemudahan yang kamu butuhkan untuk mengikuti event dan
              mendapatkan sertifikat digital secara aman dan praktis.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="p-8 transition-all border border-gray-800 shadow-xl bg-gray-900/50 backdrop-blur-md rounded-3xl hover:border-blue-500/40 hover:bg-gray-900">
              {/* Icon + Title (CENTER) */}
              <div className="flex flex-col items-center mb-8 text-center">
                <ShieldCheck className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-black tracking-wide text-white uppercase">
                  Secure & Valid
                </h3>
              </div>

              {/* List (LEFT) */}
              <ul className="space-y-3 text-sm text-left text-gray-300">
                <li>✔ Sertifikat digital terverifikasi & valid</li>
                <li>✔ Aman dari pemalsuan data</li>
                <li>✔ Keaslian sertifikat dapat dicek</li>
                <li>✔ Data peserta terlindungi</li>
              </ul>
            </div>

            {/* Benefit 2 */}
            <div className="p-8 transition-all border border-gray-800 shadow-xl bg-gray-900/50 backdrop-blur-md rounded-3xl hover:border-blue-500/40 hover:bg-gray-900">
              {/* Icon + Title (CENTER) */}
              <div className="flex flex-col items-center mb-8 text-center">
                <Zap className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-black tracking-wide text-white uppercase">
                  Fast & Automated
                </h3>
              </div>

              {/* List (LEFT) */}
              <ul className="space-y-3 text-sm text-left text-gray-300">
                <li>✔ Daftar event dengan cepat</li>
                <li>✔ Sertifikat terbit otomatis</li>
                <li>✔ Tidak perlu menunggu lama</li>
                <li>✔ Semua event tersimpan di satu akun</li>
              </ul>
            </div>

            {/* Benefit 3 */}
            <div className="p-8 transition-all border border-gray-800 shadow-xl bg-gray-900/50 backdrop-blur-md rounded-3xl hover:border-blue-500/40 hover:bg-gray-900">
              {/* Icon + Title (CENTER) */}
              <div className="flex flex-col items-center mb-8 text-center">
                <Globe className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-black tracking-wide text-white uppercase">
                  Easy Access
                </h3>
              </div>

              {/* List (LEFT) */}
              <ul className="space-y-3 text-sm text-left text-gray-300">
                <li>✔ Akses sertifikat kapan saja</li>
                <li>✔ Mudah dibagikan ke LinkedIn & CV</li>
                <li>✔ Tidak takut sertifikat hilang</li>
                <li>✔ Bisa diakses dari mana saja</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS (PUBLIC USERS) ====================== */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-blue-600/10 blur-[140px] rounded-full"></div>

        <div className="container mx-auto max-w-[90%] relative">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-white">
              What People Say
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Cerita langsung dari peserta yang sudah mengikuti event melalui
              CERT.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Nabila Putri",
                role: "Mahasiswa",
                text: "Sertifikat langsung keluar setelah event selesai. Praktis banget dan tampilannya profesional.",
              },
              {
                name: "Rizky Aditya",
                role: "Fresh Graduate",
                text: "Aku suka karena semua sertifikat tersimpan rapi dan gampang dibagikan ke LinkedIn.",
              },
              {
                name: "Salsa Ramadhani",
                role: "Webinar Participant",
                text: "Nggak perlu nunggu lama atau chat admin. Sertifikat otomatis dan aman.",
              },
              {
                name: "Dimas Prakoso",
                role: "Tech Enthusiast",
                text: "Event-eventnya jelas, informatif, dan sistemnya modern.",
              },
              {
                name: "Aulia Rahman",
                role: "Job Seeker",
                text: "CERT bantu banget buat ngumpulin sertifikat buat CV tanpa ribet.",
              },
              {
                name: "Intan Permata",
                role: "Public User",
                text: "Satu platform buat semua event. Simple, cepat, dan terpercaya.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 transition-all border border-gray-800 shadow-xl bg-gray-900/50 backdrop-blur-md rounded-3xl hover:border-blue-500/40"
              >
                <Quote className="absolute w-8 h-8 text-blue-500/20 top-6 right-6" />
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                  “{t.text}”
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>

                  <div className="flex gap-1 text-blue-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== OUR PARTNERS ====================== */}
      <section className="py-24 border-t border-gray-900 bg-gray-950/50">
        <div className="container px-6 mx-auto mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black text-white">
            Trusted by <span className="text-blue-500">Industry Leaders</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Kami berkolaborasi dengan berbagai perusahaan teknologi global untuk
            memberikan kualitas sertifikasi terbaik.
          </p>
        </div>

        <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-linear-to-r before:from-[#0a121e] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-linear-to-l after:after:from-[#0a121e] after:after:to-transparent">
          <div className="flex py-10 animate-marquee whitespace-nowrap">
            {partners.concat(partners).map((logo, index) => (
              <div
                key={index}
                className="flex items-center mx-12 transition-all duration-500 shrink-0 grayscale hover:grayscale-0 opacity-40 hover:opacity-100"
              >
                <img
                  src={logo}
                  alt="Partner"
                  className="object-contain h-12 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
