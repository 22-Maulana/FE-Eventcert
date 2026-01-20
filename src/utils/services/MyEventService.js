import api from "../api"; // axios instance

const MyEventsService = {
    getMyEvents: async () => {
        try {
            const res = await api.get("/my-events");
            return res.data;
        } catch (err) {
            console.error("Gagal mengambil my events:", err);
            return [];
        }
    },
};

export default MyEventsService;
