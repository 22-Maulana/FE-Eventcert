import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Certificate = () => {
  const { eventId } = useParams();

  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);

  // =========================================
  // FUNGSI DETEKSI NAMA USER (AMAN 100%)
  // =========================================
  const getUserName = (data) => {
    if (!data) return "Unknown";

    return (
      data.name || data.nama || data.user?.name || data.user?.nama || "Unknown"
    );
  };

  // =========================================
  // LOAD DATA
  // =========================================
  useEffect(() => {
    async function load() {
      try {
        const resEvent = await api.get(`/public/events/${eventId}`);

        const resUser = await api.get("/auth/me");

        setCertificateData({
          userName: getUserName(resUser.data),
          eventName: resEvent.data.nama_event,
          issueDate: resEvent.data.tanggal,
        });
      } catch (err) {
        console.log("Error load data", err);
      }
      setLoading(false);
    }

    load();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (!certificateData) return <div>Tidak ditemukan</div>;

  // =========================================
  // DOWNLOAD PDF
  // =========================================
    const download = async () => {
    const el = document.getElementById("certificate");

    await new Promise((r) => setTimeout(r, 300));

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");

    // Ambil ukuran canvas
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Bikin PDF sesuai rasio gambar
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "landscape" : "portrait",
      unit: "px",
      format: [imgWidth, imgHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("sertifikat.pdf");
  };

  const textStyle = {
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  };

  // =========================================
  // RENDER
  // =========================================
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
        <h1 className="mb-3 text-xl">Sertifikat Anda</h1>

        <p>
          Untuk <b>{certificateData.userName}</b> <br />
          Event <b>{certificateData.eventName}</b> <br />
          Tanggal {certificateData.issueDate}
        </p>

        <button
          onClick={() => setShow(true)}
          className="flex gap-2 px-5 py-2 mt-4 bg-purple-600 rounded"
        >
          <Download /> Lihat / Download
        </button>

        <Link to="/my-events" className="block mt-3 text-blue-400">
          Kembali
        </Link>
      </div>

      {/* POPUP CERTIFICATE */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            id="certificate"
            className="relative w-[840px] h-[594px] overflow-hidden bg-white"
          >
            {/* BACKGROUND IMAGE */}
            <img
              src="/certificate-bg.jpg"
              alt="certificate background"
              className="absolute inset-0 object-cover w-full h-full"
              crossOrigin="anonymous"
            />

            {/* CONTENT */}
            <div
              style={textStyle}
              className="relative z-10 flex flex-col items-center h-full px-12 text-center text-black pt-18"
            >
              {/* LOGO */}
              <img
                src="/logo.png"
                alt="Logo Instansi"
                className="object-contain h-14"
              />

              {/* JUDUL + NOMOR */}
              <div className="mt-5 text-black">
                <h2 className="text-[28px] font-bold tracking-wide">
                  SERTIFIKAT PELATIHAN
                </h2>
                <p className="-mt-0.5 text-xs">Nomor: 012/EVT/EC/2026</p>
              </div>

              {/* NAMA PESERTA */}
              <div className="mt-4 text-black">
                <p className="text-xs">Diberikan kepada:</p>

                <h3 className="mt-2 text-[34px] font-bold uppercase tracking-wider">
                  {certificateData.userName}
                </h3>
              </div>

              {/* DESKRIPSI */}
              <div className="mt-2 max-w-[600px] text-sm leading-relaxed text-black">
                <p>
                  Atas partisipasi aktif sebagai{" "}
                  <span className="font-semibold">peserta</span> dalam kegiatan
                  <span className="font-semibold">
                    {" "}
                    {certificateData.eventName}
                  </span>
                  , yang diselenggarakan sebagai bagian dari program
                  pengembangan kompetensi dan peningkatan kapasitas sumber daya
                  manusia.
                </p>

                <p className="mt-2">
                  Kegiatan ini dilaksanakan pada tanggal
                  <span className="font-semibold">
                    {" "}
                    {certificateData.issueDate}
                  </span>
                  .
                </p>
              </div>

              {/* TTD */}
              <div className="flex flex-col items-center mt-2 text-black">
                <p className="text-xs">Surabaya, {certificateData.issueDate}</p>

                <img
                  src="/ttd.png"
                  alt="Tanda Tangan"
                  className="object-contain mt-2 h-14"
                />

                <p className="mt-1 text-xs font-semibold underline">
                  Nama Penanggung Jawab
                </p>
                <p className="text-xs">Ketua Pelaksana</p>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="absolute flex gap-3 bottom-10">
            <button
              onClick={download}
              className="px-4 py-2 text-white bg-green-600 rounded"
            >
              Download PDF
            </button>

            <button
              onClick={() => setShow(false)}
              className="px-4 py-2 text-white bg-red-600 rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
