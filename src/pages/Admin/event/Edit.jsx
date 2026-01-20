import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTemplates } from "../../../utils/services/TemplateService";
import { updateEvent } from "../../../utils/services/EventService";
import api from "../../../utils/api";

const EventEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaEvent, setNamaEvent] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templates, setTemplates] = useState([]);

  const [poster, setPoster] = useState(null);
  const [oldPoster, setOldPoster] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");

  // =============================
  // AMBIL DATA EVENT EXISTING
  // =============================
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        const data = res.data;

        setNamaEvent(data.nama_event);
        setDeskripsi(data.deskripsi);
        setTanggal(data.tanggal);
        setTemplateId(data.template_id);
        setOldPoster(data.poster); // poster lama
      } catch (err) {
        console.log(err);
        setError("Gagal memuat data event.");
      }
    };

    fetchEvent();
  }, [id]);

  // =============================
  // AMBIL TEMPLATE
  // =============================
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTemplates();
  }, []);

  // =============================
  // FILE UPLOAD HANDLER
  // =============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // =============================
  // SUBMIT UPDATE
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("nama_event", namaEvent);
      formData.append("deskripsi", deskripsi);
      formData.append("tanggal", tanggal);
      formData.append("template_id", templateId);

      // Jika user upload poster baru
      if (poster) {
        formData.append("poster", poster);
      }

      await updateEvent(id, formData);
      navigate("/admin/events");

    } catch (err) {
      console.log(err);
      setError("Gagal mengubah event. Coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-950">
      <div className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-800 shadow-lg rounded-xl">
        <h2 className="mb-4 text-3xl font-bold text-white">Edit Event</h2>
        <p className="mb-6 text-white placeholder:text-gray-400">
          Perbarui informasi event pada formulir berikut.
        </p>

        {error && <p className="mb-3 text-red-500">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nama Event */}
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

          {/* Deskripsi */}
          <div>
            <label className="block mb-1 text-white">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg"
              required
            />
          </div>

          {/* Tanggal */}
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

          {/* Template */}
          <div>
            <label className="block mb-1 text-white">Pilih Template</label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-lg"
              required
            >
              <option value="">-- Pilih Template Sertifikat --</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Poster */}
          <div>
            <label className="block mb-1 text-white">Poster Event</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
            />

            {/* Poster Lama */}
            {oldPoster && !preview && (
              <img
                src={`${import.meta.env.VITE_API_URL}/storage/${oldPoster}`}
                alt="Poster Lama"
                className="w-full mt-3 border border-gray-700 rounded-lg"
              />
            )}

            {/* Poster Baru Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full mt-3 border border-gray-700 rounded-lg"
              />
            )}
          </div>

          {/* Buttons */}
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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;
