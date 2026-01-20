import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../../utils/services/EventService";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Edit, Trash2, Plus } from "lucide-react";

// Tentukan Base URL Backend di luar komponen
const LARAVEL_BASE_URL = import.meta.env.VITE_API_URL;

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Gagal memuat event:", error);
      // Handle error, mungkin dengan menampilkan pesan ke user
      setEvents([]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus event ini?")) return;
    try {
      await deleteEvent(id);
      loadEvents(); // Muat ulang event setelah penghapusan
    } catch (error) {
      console.error("Gagal menghapus event:", error);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Manajemen Event 📅</h2>

        <button
          onClick={() => navigate("/admin/events/create")}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Tambah Event
        </button>
      </div>

      <p className="mb-4 text-gray-400">
        Kelola event, termasuk nama, tanggal, poster, dan template.
      </p>

      {/* CARD LIST */}
      <div className="p-6 bg-gray-800 rounded-lg">
        {events.length === 0 ? (
          <p className="text-gray-300">Belum ada event.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
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

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/admin/events/edit/${event.id}`}
                    className="flex-1 px-3 py-2 text-sm text-center text-white bg-yellow-600 rounded-lg cursor-pointer hover:bg-yellow-700"
                  >
                    <Edit size={16} className="inline-block mr-1" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 px-3 py-2 text-sm text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700"
                  >
                    <Trash2 size={16} className="inline-block mr-1" />
                    Hapus
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
