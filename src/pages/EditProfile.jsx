import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateProfile } from "../utils/services/AuthService";
import { Loader2, User, Mail, ArrowLeft, Sparkles } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();
  const currentUser = getUserData();

  const [formData, setFormData] = useState({
    nama: currentUser?.nama || "",
    email: currentUser?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateProfile(formData);
      setSuccess("Profil berhasil diperbarui.");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen px-6 overflow-hidden bg-[#0a121e]">
      {/* Glow background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl p-10 border border-gray-800 shadow-2xl bg-gray-900/50 backdrop-blur-xl rounded-4xl">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-blue-600/20">
              <Sparkles className="text-blue-400 w-7 h-7" />
            </div>
            <h1 className="mb-2 text-3xl font-black text-white">
              Edit Profil
            </h1>
            <p className="text-sm text-gray-400">
              Perbarui informasi akun kamu di CERT
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              icon={<User className="w-5 h-5 text-gray-400" />}
              label="Nama Lengkap"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
            />

            <Input
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {error && (
              <Alert type="error">{error}</Alert>
            )}
            {success && (
              <Alert type="success">{success}</Alert>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-3 py-4 font-bold text-white transition-all bg-blue-600 rounded-2xl hover:bg-blue-500 active:scale-95 disabled:opacity-60"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Simpan Perubahan
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex items-center justify-center w-full gap-2 py-4 text-sm font-semibold text-gray-300 transition border border-gray-700 rounded-2xl hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ===== Components ===== */

const Input = ({ label, icon, ...props }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-400">
      {label}
    </label>
    <div className="relative">
      <span className="absolute -translate-y-1/2 left-4 top-1/2">
        {icon}
      </span>
      <input
        {...props}
        required
        className="w-full py-3 pl-12 pr-4 text-white border border-gray-700 bg-gray-800/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

const Alert = ({ type, children }) => {
  const styles =
    type === "error"
      ? "text-red-300 border-red-500/30 bg-red-900/30"
      : "text-green-300 border-green-500/30 bg-green-900/30";

  return (
    <div className={`px-4 py-3 text-sm border rounded-xl ${styles}`}>
      {children}
    </div>
  );
};

export default EditProfile;
