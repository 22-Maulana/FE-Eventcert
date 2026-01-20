import api from "../api";
import axios from "axios";
const API_E = `${import.meta.env.VITE_API_URL}/api`;

// Ambil semua event milik user yang login
// Ambil semua event untuk publik
export const getEvents = async () => {
  try {
    const res = await api.get("/public/events");
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil public events:", error);
    return [];
  }
};

// Ambil detail event publik
export const getEventDetail = async (id) => {
  try {
    const res = await api.get(`/public/events/${id}`);
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil detail public event:", error);
    return null;
  }
};


// Buat event baru (dengan poster upload)
export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/events", eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal membuat event:", error);
    throw error;
  }
};

// Update event (juga mendukung multipart/form-data)
export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.post(`/events/${id}?_method=PUT`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal update event:", error);
    throw error;
  }
};

// Hapus event
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus event:", error);
    throw error;
  }
};

export function lockPeserta(eventId) {
  const token = localStorage.getItem("token");

  return axios.post(`${API_E}/events/${eventId}/lock`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
