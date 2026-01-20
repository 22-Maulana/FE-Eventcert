import api from "../api";

const CertificateService = {
  generateForEvent: async (eventId) => {
    const res = await api.get(`/certificates/generate/event/${eventId}`);
    return res.data;
  },

  getCount: async (eventId) => {
    const res = await api.get(`/certificates/count/${eventId}`);
    return res.data;
  }
};

export default CertificateService;
