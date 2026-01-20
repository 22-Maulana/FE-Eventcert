import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ManageGenerate = () => {
  const { id } = useParams();

  const [peserta, setPeserta] = useState([]);
  const [event, setEvent] = useState(null);

  const [showCertificate, setShowCertificate] = useState(false);
  const [selected, setSelected] = useState(null);

  const [loadingLock, setLoadingLock] = useState(false);

  // ===========================
  // LOAD DATA
  // ===========================
  const loadData = () => {
    api.get(`/public/events/${id}`).then((res) => setEvent(res.data));

    api
      .get(`/public/events/${id}/peserta-hadir`)
      .then((res) => setPeserta(res.data.data || []));
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // ===========================
  // LOCK PESERTA
  // ===========================
  const lockPeserta = async () => {
    if (!confirm("Yakin ingin lock semua peserta hadir?")) return;

    setLoadingLock(true);

    try {
      const res = await api.post(`/events/${id}/lock`);
      alert(res.data.message);

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal lock peserta");
    }

    setLoadingLock(false);
  };

  // ===========================
  // OPEN CERTIFICATE
  // ===========================
  const openCertificate = (p) => {
    setSelected(p);
    setShowCertificate(true);
  };

  // ===========================
  // DOWNLOAD PDF
  // ===========================

  const downloadPDF = async () => {
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

  // ===========================
  // STYLE FIX (AMAN UNTUK html2canvas)
  // ===========================
  const textStyle = {
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl font-bold">Peserta Hadir</h1>

      {/* BUTTON LOCK */}
      <div className="mb-4">
        <button
          onClick={lockPeserta}
          disabled={loadingLock}
          className={`px-4 py-2 rounded text-white ${
            loadingLock ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loadingLock
            ? "Processing..."
            : "Lock Peserta & Buat Rekap Sertifikat"}
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden border shadow-sm rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-white bg-slate-700">
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {peserta.map((p, i) => (
              <tr
                key={p.id}
                className={`${i % 2 === 0 ? "bg-gray-800" : "bg-gray-800"} border-b`}
              >
                <td className="px-4 py-3 text-white">{p.nama}</td>
                <td className="px-4 py-3 text-white">{p.email}</td>
                <td className="px-4 py-3 text-center text-green-700">
                  <button
                    onClick={() => openCertificate(p)}
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CERTIFICATE POPUP (ADMIN) */}
      {showCertificate && selected && event && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            id="certificate"
            className="relative w-[840px] h-[594px] overflow-hidden bg-white"
          >
            {/* BACKGROUND */}
            <img
              src="/certificate-bg.jpg"
              alt="certificate background"
              className="absolute inset-0 object-cover w-full h-full"
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
                <p className="text-xs -mt-0.5">Nomor: 012/EVT/EC/2026</p>
              </div>

              {/* NAMA PESERTA */}
              <div className="mt-4 text-black">
                <p className="text-xs">Diberikan kepada:</p>

                <h3 className="mt-2 text-[34px] font-bold uppercase tracking-wider">
                  {selected.nama}
                </h3>
              </div>

              {/* DESKRIPSI */}
              <div className="mt-2 max-w-[600px] text-sm leading-relaxed text-black">
                <p>
                  Atas partisipasi aktif sebagai{" "}
                  <span className="font-semibold">peserta</span> dalam kegiatan
                  <span className="font-semibold"> {event.nama_event}</span>,
                  yang diselenggarakan sebagai bagian dari program pengembangan
                  kompetensi dan peningkatan kapasitas sumber daya manusia.
                </p>

                <p className="mt-2">
                  Kegiatan ini dilaksanakan pada tanggal
                  <span className="font-semibold"> {event.tanggal}</span>.
                </p>
              </div>

              {/* TTD */}
              <div className="flex flex-col items-center mt-2 text-black">
                <p className="text-xs">Surabaya, {event.tanggal}</p>

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
              onClick={downloadPDF}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Generate PDF
            </button>

            <button
              onClick={() => setShowCertificate(false)}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGenerate;
