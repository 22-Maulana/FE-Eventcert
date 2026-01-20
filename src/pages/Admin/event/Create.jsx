import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../utils/services/EventService";

const EventCreate = () => {
  const navigate = useNavigate();

  const [namaEvent, setNamaEvent] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");

  // upload poster
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();

      formData.append("nama_event", namaEvent);
      formData.append("deskripsi", deskripsi);
      formData.append("tanggal", tanggal);

      if (poster) {
        formData.append("poster", poster);
      }

      await createEvent(formData);

      navigate("/admin/events");

    } catch (err) {
      console.log("ERROR FULL:", err);

      // ✅ Debug khusus validasi Laravel
      if (err.response) {
        console.log("DEBUG VALIDATION:", err.response.data);

        // tampilkan error di UI
        setError(
          err.response.data.message ||
          "Gagal membuat event. Coba lagi."
        );
      } else {
        setError("Tidak bisa menghubungi server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-950">

      <div className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-800 shadow-lg rounded-xl">

        <h2 className="mb-4 text-3xl font-bold text-white">Tambah Event Baru</h2>

        {error && <p className="mb-3 text-red-400">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-1 text-white">Nama Event</label>
            <input
              type="text"
              value={namaEvent}
              onChange={(e) => setNamaEvent(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-white">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-white">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-white">Poster Event</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
            />

            {preview && (
              <img
                src={preview}
                className="w-full mt-3 border border-gray-700 rounded-lg"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-4 py-2 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Simpan Event
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EventCreate;
