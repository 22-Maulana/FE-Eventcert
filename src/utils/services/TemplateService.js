import api from "../api";

// Ambil semua template milik user
export const getTemplates = async () => {
  try {
    const res = await api.get("/templates");
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil template:", err);
    throw err;
  }
};

// Ambil satu template
export const getTemplateById = async (id) => {
  try {
    const res = await api.get(`/templates/${id}`);
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil template ID:", id, err);
    throw err;
  }
};

// Buat template baru
export const createTemplate = async (data) => {
  try {
    let payload;

    // Kalau user upload file → FormData
    if (data.file) {
      payload = new FormData();
      payload.append("nama", data.nama);
      payload.append("deskripsi", data.deskripsi);
      payload.append("nama_event", data.nama_event);
      payload.append("file", data.file);
    } 
    // Kalau tidak upload → data JSON biasa
    else {
      payload = {
        nama: data.nama,
        deskripsi: data.deskripsi,
        nama_event: data.nama_event,
        folder: data.folder,
      };
    }

    const res = await api.post("/templates", payload, {
      headers: data.file ? { "Content-Type": "multipart/form-data" } : {},
    });

    return res.data;
  } catch (err) {
    console.error("Gagal membuat template:", err);
    throw err;
  }
};

export const updateTemplate = async (id, data) => {
  try {
    let payload;

    if (data.file) {
      payload = new FormData();
      payload.append("nama", data.nama);
      payload.append("deskripsi", data.deskripsi);
      payload.append("nama_event", data.nama_event);
      payload.append("file", data.file);
    } else {
      payload = data;
    }

    const res = await api.post(`/templates/${id}?_method=PUT`, payload, {
      headers: data.file ? { "Content-Type": "multipart/form-data" } : {},
    });

    return res.data;
  } catch (err) {
    console.error("Gagal update template:", err);
    throw err;
  }
};


// Hapus template
export const deleteTemplate = async (id) => {
  try {
    const res = await api.delete(`/templates/${id}`);
    return res.data;
  } catch (err) {
    console.error("Gagal menghapus template:", err);
    throw err;
  }
};
