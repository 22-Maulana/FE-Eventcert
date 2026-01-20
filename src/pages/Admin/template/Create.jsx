import React, { useState } from "react";
import { createTemplate } from "../../../utils/services/TemplateService";
import { useNavigate } from "react-router-dom";

const CertCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    nama_event: "",
    folder: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTemplate(formData);
    navigate("/admin/sertifikat");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-white">Tambah Template Sertifikat 📝</h2>

      <div className="p-6 bg-gray-800 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nama */}
          <div>
            <label className="text-white">Nama Template</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white bg-gray-900 rounded-lg placeholder:text-gray-400"
              placeholder="Contoh: Template Profesional A4"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-white">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white bg-gray-900 rounded-lg placeholder:text-gray-400"
              placeholder="Deskripsi template (warna, style, posisi QR, dll)"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Nama Event */}
          <div>
            <label className="text-white">Nama Event</label>
            <input
              type="text"
              name="nama_event"
              value={formData.nama_event}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white bg-gray-900 rounded-lg placeholder:text-gray-400"
              placeholder="Contoh: Webinar Laravel"
              required
            />
          </div>

          {/* Folder (Path gambar template) */}
          <div>
            <label className="text-white">
              Path Gambar (folder) — contoh: <span className="text-blue-400">templates/template1.png</span>
            </label>

            <input
              type="text"
              name="folder"
              value={formData.folder}
              onChange={handleChange}
              className="w-full p-3 mt-2 text-white bg-gray-900 rounded-lg placeholder:text-gray-400"
              placeholder="templates/template1.png"
              required
            />

            {formData.folder && (
              <img
                src={`${import.meta.env.VITE_API_URL}/${formData.folder}`}
                className="object-cover w-full h-48 mt-3 border rounded-lg"
                alt="Preview Template"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg cursor-pointer placeholder:text-gray-400 hover:bg-blue-700"
          >
            Simpan Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default CertCreate;
