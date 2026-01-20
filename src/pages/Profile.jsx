import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  Edit2,
  LogOut,
  Lock,
  Sparkles,
} from "lucide-react";
import { getUserData, logout } from "../utils/services/AuthService";

/* ===== Small Components ===== */

const InfoCard = ({ icon: Icon, label, value, accent = "blue" }) => {
  const accentMap = {
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
  };

  return (
    <div className="flex items-center gap-4 p-5 transition border border-gray-800 bg-gray-900/60 rounded-2xl hover:bg-gray-800">
      <div className={`p-3 rounded-xl bg-${accent}-600/15`}>
        <Icon className={`w-5 h-5 ${accentMap[accent]}`} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

const ActionButton = ({ to, icon: Icon, label, color }) => (
  <Link
    to={to}
    className={`flex items-center justify-center gap-3 py-4 font-bold text-white transition-all rounded-2xl active:scale-95 ${color}`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </Link>
);

/* ===== Page ===== */

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 bg-[#0a121e]">
        Silakan{" "}
        <Link to="/login" className="ml-1 text-blue-400 underline">
          login
        </Link>{" "}
        untuk melihat profil.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 pt-36 pb-20 overflow-hidden bg-[#0a121e]">
      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center mb-4 w-14 h-14 rounded-2xl bg-blue-600/20">
            <Sparkles className="text-blue-400 w-7 h-7" />
          </div>
          <h1 className="text-4xl font-black text-white">Akun Saya</h1>
          <p className="mt-2 text-gray-400">
            Kelola informasi dan keamanan akun Anda
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* LEFT – INFO */}
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 pb-3 text-xl font-bold text-white border-b border-gray-800">
              <User className="w-5 h-5 text-blue-400" />
              Informasi Akun
            </h2>

            <InfoCard
              icon={User}
              label="Nama Lengkap"
              value={user.nama}
              accent="blue"
            />
            <InfoCard
              icon={Mail}
              label="Email"
              value={user.email}
              accent="green"
            />
            <InfoCard
              icon={ShieldCheck}
              label="Peran Akun"
              value={user.role}
              accent="purple"
            />
          </div>

          {/* RIGHT – ACTION */}
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <h2 className="pb-3 text-xl font-bold text-white border-b border-gray-800">
                Pengaturan
              </h2>

              <ActionButton
                to="/profile/edit"
                icon={Edit2}
                label="Edit Profil"
                color="bg-blue-600 hover:bg-blue-500"
              />

              <ActionButton
                to="/profile/password"
                icon={Lock}
                label="Ganti Password"
                color="bg-indigo-600 hover:bg-indigo-500"
              />
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 py-4 font-bold text-white transition-all bg-red-600 rounded-2xl hover:bg-red-500 active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
