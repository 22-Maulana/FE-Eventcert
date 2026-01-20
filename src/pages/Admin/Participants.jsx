import React, { useEffect, useState } from "react";
import * as EventService from "../../utils/services/EventService";
import PesertaService from "../../utils/services/PesertaService";
import CertificateService from "../../utils/services/CertificateService";

const LARAVEL_BASE_URL = import.meta.env.VITE_API_URL;

const ParticipantsManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  // Load semua event publik
  const loadEvents = async () => {
    try {
      const data = await EventService.getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Gagal load event:", err);
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

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    loadParticipants(event.id);
  };

  return (
    <div className="p-4">
      <h2 className="mb-6 text-3xl font-bold text-white">
        Manajemen Peserta 👥
      </h2>

      {!selectedEvent ? (
        <div className="space-y-4">
          <p className="text-gray-400">Pilih event untuk melihat peserta:</p>
          {events.map((event) => (
            <div
              onClick={() => handleEventClick(event)}
              key={event.id}
              className="flex items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              {/* Poster */}
              <img
                src={
                  event.poster
                    ? `${LARAVEL_BASE_URL}/storage/${event.poster}`
                    : "/images/default-poster.png"
                }
                alt={event.nama_event}
                className="object-cover w-24 h-24 mr-4 rounded-lg"
              />

              {/* Judul + deskripsi + tanggal */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {event.nama_event}
                </h3>
                <p className="text-gray-300">{event.deskripsi}</p>
                <p className="mt-1 text-gray-400">{event.tanggal}</p>
              </div>

              {/* <div
                className="absolute inset-0"
                
              /> */}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="mb-4 text-sm text-blue-400 hover:underline"
            onClick={() => setSelectedEvent(null)}
          >
            ← Kembali ke daftar event
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
                      <th className="py-2">Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p) => (
                      <tr key={p.id} className="border-b border-gray-700">
                        <td className="py-2">{p.nama}</td>
                        <td className="py-2">{p.email}</td>
                        <td className="py-2">{p.tanggal_daftar}</td>
                        <td className="py-2">
                          {p.status ? (
                            <span className="font-medium text-green-400">
                              Hadir
                            </span>
                          ) : (
                            <span className="font-medium text-red-400">
                              Tidak Hadir
                            </span>
                          )}
                        </td>
                        <td className="py-2">
                          {p.certificate_url ? (
                            <span className="font-medium text-green-400">
                              Sudah Terbit
                            </span>
                          ) : (
                            <span className="font-medium text-yellow-400">
                              Belum
                            </span>
                          )}
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

export default ParticipantsManagement;
