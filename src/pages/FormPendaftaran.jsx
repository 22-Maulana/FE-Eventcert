import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PesertaService from "../utils/services/PesertaService";

const FormPendaftaran = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    instansi: "",
    whatsapp: "",
    kota: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];
      await PesertaService.register({
        id_webinar: eventId,
        tanggal_daftar: today,
        status: true,
        ...formData,
      });

      PesertaService.saveRegistration(eventId);
      alert("Pendaftaran berhasil!");
      navigate(`/events/${eventId}`);
    } catch {
      alert("Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex justify-center pb-20 pt-30 bg-gray-950 text-white px-6">
      <div className="w-full max-w-xl p-8 bg-gray-900 border border-gray-800 shadow-xl rounded-2xl">
        <h1 className="mb-3 text-3xl font-bold">Form Pendaftaran Event</h1>
        <p className="mb-8 text-lg text-green-400">
          Mendaftar untuk Event ID: {eventId}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Isi nama lengkap"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Instansi */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Instansi / Organisasi (Opsional)
            </label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nama instansi / kampus / perusahaan"
            />
          </div>

          {/* WA */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              placeholder="08xxxx"
              required
            />
          </div>

          {/* Kota */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Asal Kota
            </label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Surabaya, Malang, Jakarta, dll."
            />
          </div>

          {/* Tombol */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Mengirim..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPendaftaran;
