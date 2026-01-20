import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEventDetail } from "../utils/services/EventService";
import { isLoggedIn } from "../utils/services/AuthService";
import PesertaService from "../utils/services/PesertaService";
import {
  Calendar,
  Info,
  ArrowLeft,
  CheckCircle,
  Lock,
  ChevronRight,
  Loader2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEventDetail(eventId);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#0a121e]">
        <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin" />
        <p className="font-bold tracking-widest uppercase">
          Memuat Detail Event...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#0a121e] px-6">
        <div className="p-10 text-center bg-gray-900 border border-gray-800 shadow-2xl rounded-4xl">
          <h2 className="mb-4 text-3xl font-black text-red-500">
            Event Tidak Ditemukan! 😢
          </h2>
          <p className="mb-8 text-gray-400">
            Pastikan URL atau ID event sudah benar.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white transition-all bg-blue-600 rounded-2xl hover:bg-blue-500 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Daftar Event
          </Link>
        </div>
      </div>
    );
  }

  const { nama_event, tanggal, deskripsi, poster } = event;
  const imageUrl = poster
    ? `${API_URL}/storage/${poster.replace("system/", "")}`
    : "/default-poster.jpg";

  const isLoggedInStatus = isLoggedIn();
  const isRegistered = PesertaService.isRegistered(eventId);
  const eventDate = new Date(tanggal);
  const today = new Date();
  const isUpcoming = eventDate >= today;

  // Logika Tombol Dinamis
  let buttonConfig = {
    text: "DAFTAR EVENT SEKARANG",
    path: `/form-pendaftaran/${eventId}`,
    icon: <ChevronRight className="w-5 h-5" />,
    className: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20",
    disabled: false,
  };

  if (!isUpcoming) {
    buttonConfig = {
      text: "Event Telah Berakhir",
      path: "#",
      icon: <Info className="w-5 h-5" />,
      className: "bg-gray-700 cursor-not-allowed",
      disabled: true,
    };
  } else if (!isLoggedInStatus) {
    buttonConfig = {
      text: "Login untuk Mendaftar",
      path: `/login?redirect=${eventId}`,
      icon: <Lock className="w-5 h-5" />,
      className: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20",
      disabled: false,
    };
  } else if (isRegistered) {
    buttonConfig = {
      text: "Anda Sudah Terdaftar",
      path: "#",
      icon: <CheckCircle className="w-5 h-5" />,
      className: "bg-emerald-600/50 text-emerald-200 cursor-not-allowed",
      disabled: true,
    };
  }

  return (
    <div className="min-h-screen bg-[#0a121e] text-white pb-20">
      {/* Hero Header Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={nama_event}
          className="object-cover w-full h-full scale-105 opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a121e] via-[#0a121e]/60 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-32 text-center">
          <h1 className="max-w-4xl mb-4 text-4xl font-black leading-tight tracking-tighter -mt-15 md:text-6xl">
            {nama_event}
          </h1>
          <div className="flex items-center gap-4 px-6 py-2 font-bold text-blue-400 border rounded-full bg-blue-600/20 backdrop-blur-md border-blue-500/30">
            <Calendar className="w-5 h-5" /> {tanggal}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl px-6 mx-auto -mt-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Deskripsi Section */}
            <div className="p-8 border border-gray-800 shadow-2xl bg-gray-900/50 backdrop-blur-xl rounded-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-2xl">
                  <Info className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-black">Tentang Event</h2>
              </div>
              <p className="text-lg leading-loose text-gray-300">
                {deskripsi || "Tidak ada deskripsi tersedia untuk event ini."}
              </p>
            </div>

            {/* Poster Detail */}
            <div className="overflow-hidden border border-gray-800 shadow-2xl rounded-4xl group">
              <img
                src={imageUrl}
                alt="Poster Event"
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Sidebar Sticky Action */}
          <div className="lg:col-span-1">
            <div className="sticky p-8 space-y-6 bg-gray-900 border border-gray-800 shadow-2xl top-32 rounded-4xl">
              <div className="text-center">
                <h3 className="mb-2 text-xl font-black">Pendaftaran Event</h3>
                <p className="text-sm text-gray-400">
                  Pastikan data profil Anda sudah benar sebelum mendaftar.
                </p>
              </div>

              <div className="h-px bg-gray-800"></div>

              <Link
                to={buttonConfig.path}
                onClick={(e) => buttonConfig.disabled && e.preventDefault()}
                className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black transition-all active:scale-95 shadow-lg ${buttonConfig.className}`}
              >
                {buttonConfig.text} {buttonConfig.icon}
              </Link>

              <Link
                to="/events"
                className="flex items-center justify-center w-full py-4 font-bold text-gray-400 transition-all bg-transparent border border-gray-800 rounded-2xl hover:bg-gray-800"
              >
                Cari Event Lainnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
