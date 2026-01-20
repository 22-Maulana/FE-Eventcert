import api from "../api"; // axios instance

const PesertaService = {
  getAll: async () => {
    try {
      const res = await api.get("/peserta");
      return res.data;
    } catch (err) {
      console.error("Gagal mengambil peserta:", err);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/peserta/${id}`);
      return res.data;
    } catch (err) {
      console.error("Gagal mengambil detail peserta:", err);
      return null;
    }
  },

  register: async (data) => {
    try {
      const res = await api.post("/peserta/daftar", data);
      PesertaService.saveRegistration(data.id_webinar);
      return res.data;
    } catch (err) {
      console.error("Gagal mendaftar peserta:", err);
      throw err;
    }
  },

  isRegistered: (eventId) => {
    const registered = JSON.parse(
      localStorage.getItem("registeredEvents") || "[]"
    );
    return registered.includes(eventId);
  },

  saveRegistration: (eventId) => {
    const registered = JSON.parse(
      localStorage.getItem("registeredEvents") || "[]"
    );
    if (!registered.includes(eventId)) {
      registered.push(eventId);
      localStorage.setItem("registeredEvents", JSON.stringify(registered));
    }
  },

  getTotalPeserta: async () => {
    const allPeserta = await PesertaService.getAll();
    return allPeserta.length;
  },

  updateStatus: async (id, data) => {
    const res = await api.put(`/peserta/${id}/status`, data);
    return res.data;
  },
};


export default PesertaService;
