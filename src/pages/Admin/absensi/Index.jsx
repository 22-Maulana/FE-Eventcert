import React, { useEffect, useState } from "react";
import { getEvents } from "../../../utils/services/EventService";
import { CalendarDays, Edit, Plus } from "lucide-react";

import PesertaService from "../../../utils/services/PesertaService";

// Tentukan Base URL Backend di luar komponen
const LARAVEL_BASE_URL = import.meta.env.VITE_API_URL;

const RekapAbsensi = () => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Gagal memuat event:", error);
      setEvents([]);
    }
  };

  // Load peserta untuk event tertentu
  const loadParticipants = async (eventId) => {
    try {
      const allPeserta = await PesertaService.getAll();
      const filtered = allPeserta.filter((p) => p.event?.id === eventId);
      setParticipants(filtered);
    } catch (err) {
      console.error("Gagal load peserta:", err);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    loadParticipants(event.id);
  };

  const handleChangeStatus = async (id, value) => {
    try {
      const status = value === "hadir" ? 1 : 0;

      await PesertaService.updateStatus(id, { status });

      // Update state lokal supaya UI langsung berubah
      setParticipants((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal memperbarui status kehadiran.");
    }
  };

  return (
    <div className="p-6">
      {/* JIKA BELUM PILIH EVENT — LIST EVENT */}
      {!selectedEvent ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Rekap Absensi 📅</h2>
          </div>

          <p className="mb-4 text-gray-400">Kelola dan lihat rekap absensi.</p>

          <div className="p-6 bg-gray-800 rounded-lg">
            {events.length === 0 ? (
              <p className="text-gray-300">Belum ada event.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
                    onClick={() => handleEventClick(event)}
                  >
                    {/* POSTER */}
                    <img
                      src={
                        event.poster
                          ? `${LARAVEL_BASE_URL}/storage/${event.poster}`
                          : "/no-image.png"
                      }
                      alt={event.nama_event}
                      className="object-cover w-full h-40 mb-3 rounded-lg"
                    />

                    {/* NAME */}
                    <h3 className="text-xl font-bold text-white">
                      {event.nama_event}
                    </h3>

                    {/* DATE */}
                    <p className="flex items-center gap-2 mt-1 text-gray-300">
                      <CalendarDays size={16} className="text-blue-400" />
                      {event.tanggal}
                    </p>

                    {/* TEMPLATE NAME */}
                    <p className="mt-2 text-sm text-gray-400">
                      <span className="font-semibold text-gray-300">
                        Template:{" "}
                      </span>
                      {event.template?.nama ?? "-"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* JIKA EVENT SUDAH DIPILIH — LIST PESERTA */
        <div>
          <button
            className="mb-4 text-sm text-blue-400 hover:underline"
            onClick={() => setSelectedEvent(null)}
          >
            ← Kembali ke rekap absensi
          </button>

          <h3 className="mb-2 text-2xl font-bold text-white">
            Peserta: {selectedEvent.nama_event}
          </h3>

          <div className="p-6 mt-4 bg-gray-800 rounded-lg shadow-lg">
            {participants.length === 0 ? (
              <p className="text-gray-400">Belum ada peserta terdaftar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2">Nama</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Tanggal Daftar</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p) => (
                      <tr key={p.id} className="border-b border-gray-700">
                        <td className="py-2">{p.nama}</td>
                        <td className="py-2">{p.email}</td>
                        <td className="py-2">{p.tanggal_daftar}</td>
                        <td className="py-2">
                          <select
                            value={p.status ? "hadir" : "tidak_hadir"}
                            onChange={(e) =>
                              handleChangeStatus(p.id, e.target.value)
                            }
                            className={
                              "px-2 py-1 rounded-lg border text-white " +
                              (p.status
                                ? "bg-green-600 border-green-700" // warna HADIR
                                : "bg-red-600 border-red-700") // warna TIDAK HADIR
                            }
                          >
                            <option className="bg-gray-700" value="hadir">
                              Hadir
                            </option>
                            <option className="bg-gray-700" value="tidak_hadir">
                              Tidak Hadir
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RekapAbsensi;
