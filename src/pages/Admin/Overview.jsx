import React, { useEffect, useState } from "react";
import { Calendar, Users, Award } from "lucide-react";

import { getEvents } from "../../utils/services/EventService";
import PesertaService from "../../utils/services/PesertaService";
import axios from "axios";

// ===============================
// COMPONENT CARD
// ===============================
const AdminStatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div
      className={`bg-gray-800 p-6 rounded-xl shadow-lg 
      border-t-4 border-${color}-500 
      flex justify-between items-center 
      transform hover:scale-[1.02] transition duration-300`}
    >
      <div>
        <p className="text-sm font-semibold text-gray-400">{title}</p>
        <h3 className="mt-1 text-3xl font-extrabold">{value}</h3>
      </div>

      {Icon && (
        <Icon className={`w-8 h-8 text-${color}-400 opacity-50`} />
      )}
    </div>
  );
};


// ===============================
// MAIN COMPONENT
// ===============================
const AdminOverview = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalPeserta, setTotalPeserta] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);

  // load data setelah render
  useEffect(() => {
    loadData();
  }, []);

  // ===============================
  // LOAD DATA
  // ===============================
  const loadData = async () => {
    try {
      // -----------------------------
      // GET EVENT
      // -----------------------------
      const eventsData = await getEvents();

      const finalEvents =
        Array.isArray(eventsData) ? eventsData :
          Array.isArray(eventsData?.data) ? eventsData.data :
            [];

      setTotalEvents(finalEvents.length);


      // -----------------------------
      // GET TOTAL PESERTA
      // -----------------------------
      const pesertaCount = await PesertaService.getTotalPeserta();
      setTotalPeserta(pesertaCount);


      // -----------------------------
      // GET TOTAL CERTIFICATES
      // -----------------------------
      const certRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/public/certificates/count`);

      console.log("CERT RESPONSE:", certRes.data);

      setTotalCertificates(certRes.data.total ?? 0);


    } catch (err) {
      console.error("Load data gagal", err);

      if (err.response) {
        console.log("ERROR RESPONSE:", err.response.data);
      }
    }
  };


  // ===============================
  // RENDER
  // ===============================
  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">
          Dashboard Overview 📊
        </h1>

        <p className="mt-2 text-gray-400">
          Ringkasan status platform EventCert saat ini.
        </p>
      </header>


      {/* ===========================
           STAT CARDS
      ============================ */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">

        <AdminStatCard
          title="Total Event Aktif"
          value={totalEvents}
          icon={Calendar}
          color="blue"
        />

        <AdminStatCard
          title="Total Peserta"
          value={totalPeserta}
          icon={Users}
          color="green"
        />

        <AdminStatCard
          title="Sertifikat Diterbitkan"
          value={totalCertificates}
          icon={Award}
          color="purple"
        />

      </div>


      {/* ===========================
           ACTIVITY PLACEHOLDER
      ============================ */}
      <h2 className="pb-2 mb-6 text-2xl font-bold border-b border-gray-700">
        Aktivitas Terbaru
      </h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-inner min-h-[200px]">
        <p className="text-gray-400">
          Tidak ada aktivitas terbaru yang signifikan.
        </p>
      </div>

    </>
  );
};


export default AdminOverview;
