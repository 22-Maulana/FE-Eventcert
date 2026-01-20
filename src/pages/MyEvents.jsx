import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Award } from "lucide-react";
import api from "../utils/api";
import { getUserData } from "../utils/services/AuthService";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const u = getUserData();
    setUser(u);
    console.log("[MyEvents] Loaded user from getUserData():", u);
  }, []);

  const normalizeRaw = (raw, eventObj) => {
    if (raw === undefined || raw === null || raw === "") {
      if (eventObj?.raw_status !== undefined) raw = eventObj.raw_status;
      else if (eventObj?.status !== undefined) raw = eventObj.status;
      else if (eventObj?.rekap?.status_lulus !== undefined) raw = eventObj.rekap.status_lulus;
    }
    if (typeof raw === "string" && raw.trim() !== "") {
      const n = Number(raw);
      if (!isNaN(n)) return n;
    }
    if (typeof raw === "boolean") return raw ? 1 : 0;
    if (typeof raw === "number") return raw;
    return null;
  };

  const getStatusInfo = (raw, eventObj = {}) => {
    const normalized = normalizeRaw(raw, eventObj);
    console.log("[getStatusInfo] raw:", raw, "normalized:", normalized);

    if (normalized === 1) {
      return { text: "HADIR", textColor: "text-green-400", code: 1 };
    }
    if (normalized === 0) {
      return { text: "TIDAK HADIR", textColor: "text-red-400", code: 0 };
    }
    return { text: "Terdaftar", textColor: "text-yellow-300", code: null };
  };

  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.get("/my-events");
      const normalizedEvents = (Array.isArray(res.data) ? res.data : []).map(it => {
        const normalizedRaw = normalizeRaw(it?.raw_status ?? it?.status ?? (it?.rekap?.status_lulus ?? null), it);
        return { ...it, raw_status: normalizedRaw };
      });
      setEvents(normalizedEvents);
    } catch (err) {
      setErrorMsg("Gagal mengambil data. Cek console.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      loadData();
    }, 50);
    return () => clearTimeout(t);
  }, [user]);

  if (loading) {
    return <div className="min-h-screen py-20 text-center text-white bg-gray-900">Memuat event Anda...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen py-40 text-center text-white bg-gray-900">
        Silakan <a href="/login" className="text-blue-400 hover:underline">Login</a> untuk melihat event.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 text-white bg-gray-950">
      <div className="max-w-5xl p-8 mx-auto">

        <h1 className="pb-3 mb-10 text-4xl font-extrabold text-blue-400 border-b border-gray-700">
          Event Saya
        </h1>

        {errorMsg && (
          <div className="mb-6 p-4 text-sm text-yellow-200 bg-red-800 rounded">
            <strong>Error:</strong> {errorMsg}
            <div className="mt-2 text-xs text-gray-300">Lihat console (DevTools) untuk detail lengkap.</div>
          </div>
        )}

        <div className="space-y-5">
          {events.length === 0 ? (
            <p className="p-10 text-center text-gray-400 bg-gray-800 rounded-lg">
              Anda belum mendaftar event apa pun.
            </p>
          ) : (
            events.map(event => {
              const statusInfo = getStatusInfo(event.raw_status, event);
              const canDownload = event.certificate === true || event.certificate === 1 || statusInfo.code === 1;

              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-5 bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:bg-gray-700 transition"
                >

                  {/* LEFT */}
                  <div className="flex items-center w-1/2">
                    <div className="p-3 mr-4 rounded-full bg-gray-700">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.date}</p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3">

                    {/* BUTTON SERTIFIKAT */}
                    {canDownload ? (
                      <Link
                        to={event.certificateUrl}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow"
                      >
                        <Award className="w-4 h-4" />
                        Sertifikat
                      </Link>
                    ) : (
                      <span className="px-3 py-2 text-sm text-gray-400 bg-gray-700 rounded-lg opacity-70">
                        Sertifikat Tidak tersedia
                      </span>
                    )}

                    {/* STATUS UTAMA */}
                    <div
                      className={`px-3 py-2 rounded-lg font-bold border min-w-[120px] text-center ${statusInfo.textColor}`}
                    >
                      {statusInfo.text}
                    </div>

                    {/* KETERANGAN HADIR BERDASARKAN CERTIFICATE */}
                    <div
                      className={`
                        px-3 py-2 rounded-lg font-bold border min-w-[120px] text-center
                        ${event.certificate ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}
                      `}
                    >
                      {event.certificate ? "Hadir" : "Tidak Hadir"}
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default MyEvents;
