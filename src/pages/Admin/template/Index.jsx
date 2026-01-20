import React, { useEffect, useState } from "react";
import { getTemplates, deleteTemplate } from "../../../utils/services/TemplateService";
import { Link } from "react-router-dom";

const TemplateIndex = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    const data = await getTemplates();
    setTemplates(data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus template ini?")) return;
    await deleteTemplate(id);
    loadTemplates();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Manajemen Template Sertifikat 🏆</h2>
        <Link
          to="create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Tambah Template
        </Link>
      </div>

      <p className="mb-4 text-gray-400">
        Kelola template sertifikat, termasuk nama, deskripsi, dan file yang digunakan untuk generate sertifikat.
      </p>

      <div className="p-6 bg-gray-800 rounded-lg">
        {templates.length === 0 ? (
          <p className="text-gray-300">Belum ada template.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <div key={t.id} className="p-4 bg-gray-900 rounded-lg shadow">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${t.folder}`}
                  alt={t.nama}
                  className="object-cover w-full h-40 mb-3 rounded-lg"
                />

                <h3 className="text-xl font-bold text-white">{t.nama}</h3>
                <p className="mb-2 text-sm text-gray-400">{t.deskripsi}</p>

                <p className="mb-4 text-sm text-gray-300">
                  <span className="font-semibold">Event: </span>
                  {t.nama_event}
                </p>

                <div className="flex gap-2">
                  <Link
                    to={`/admin/templates/edit/${t.id}`}
                    className="flex-1 px-3 py-2 text-sm text-center text-white bg-yellow-600 rounded-lg cursor-pointer hover:bg-yellow-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex-1 px-3 py-2 text-sm text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700"
                  >
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

export default TemplateIndex;
