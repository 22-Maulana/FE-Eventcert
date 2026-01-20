// import React from "react";
// import { Link } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL; 

// const EventCard = ({ event }) => {
    
//     const getImageUrl = () => {
//         if (event.poster) {
//             return `${API_URL}/storage/${event.poster}`; 
//         }
//         if (event.image && event.image.startsWith('http')) {
//             return event.image;
//         }
//         return "/default-poster.jpg";
//     };

//     return (
//         // Container Card
//         <div className="overflow-hidden transition duration-300 transform bg-gray-800 shadow-lg rounded-xl hover:scale-105">
//             <img
//                 src={getImageUrl()} 
//                 alt={event.nama_event || event.title}
//                 className="object-cover w-full h-48" 
//             />

//             {/* CARD BODY: Menggunakan Flex Column untuk Tata Letak Vertikal */}
//             <div className="flex flex-col p-5 text-white min-h-50"> 
                
//                 {/* 1. KONTEN: Menggunakan grow untuk mengisi ruang kosong */}
//                 <div className="grow"> 
//                     <h3 className="mb-2 text-xl font-semibold">
//                         {event.nama_event || event.title}
//                     </h3>

//                     <p className="mb-1 text-sm text-gray-400">
//                         📅 {event.tanggal}
//                     </p>

//                     <p className="mb-3 text-sm text-gray-400 line-clamp-2">
//                         {event.deskripsi || "Deskripsi tidak tersedia."} 
//                     </p>
//                 </div>

//                 {/* 2. TOMBOL: Didorong ke bawah menggunakan margin-auto */}
//                 <Link
//                     to={`/events/${event.id}`}
//                     className="self-start inline-block px-4 py-1 mt-auto text-white bg-blue-600 rounded-lg hover:bg-blue-700" 
//                 >
//                     View Details
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default EventCard;
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Info } from "lucide-react"; // Import ikon modern

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://127.0.0.1:8000";

const EventCard = ({ event }) => {
  const getImageUrl = () => {
    if (event.poster) {
      return `${API_URL}/storage/${event.poster}`;
    }
    if (event.image && event.image.startsWith("http")) {
      return event.image;
    }
    return "/default-poster.jpg";
  };

  return (
    <div className="relative overflow-hidden transition-all duration-500 border border-gray-800 group bg-gray-900/40 backdrop-blur-md rounded-4xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Container Gambar dengan Overlay Gradien */}
      <div className="relative overflow-hidden h-80">
        <img
          src={getImageUrl()}
          alt={event.nama_event || event.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay agar teks di bawah lebih menyatu */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a121e] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Body Card */}
      <div className="flex flex-col p-6 text-white min-h-56">
        {/* Konten Atas */}
        <div className="grow">
          <h3 className="mb-3 text-xl font-black transition-colors group-hover:text-blue-400 line-clamp-1">
            {event.nama_event || event.title}
          </h3>

          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-blue-400/80">
            <Calendar className="w-4 h-4" />
            <span>{event.tanggal}</span>
          </div>

          <div className="flex items-start gap-2 mb-4 text-sm text-gray-400">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" />
            <p className="leading-relaxed line-clamp-2">
              {event.deskripsi || "Deskripsi tidak tersedia untuk event ini."}
            </p>
          </div>
        </div>

        {/* Tombol Detail didorong ke bawah */}
        <Link
          to={`/events/${event.id}`}
          className="flex items-center justify-center gap-2 px-6 py-3 mt-auto text-sm font-bold text-white transition-all bg-gray-800 border border-gray-700 rounded-xl hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 group/btn"
        >
          Lihat Detail
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
