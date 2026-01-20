import api from "../api";

// Ambil semua peserta
export const getParticipants = async () => {
  try {
    const res = await api.get("/peserta"); // endpoint sesuai backend
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil peserta:", error);
    throw error;
  }
};

// Ambil detail peserta
export const getParticipantById = async (id) => {
  try {
    const res = await api.get(`/peserta/${id}`);
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil detail peserta:", error);
    throw error;
  }
};
