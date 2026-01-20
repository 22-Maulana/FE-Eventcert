// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { register } from "../../utils/services/AuthService";

// const Register = () => {
//   const [nama, setNama] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (password !== passwordConfirmation) {
//       setError("Password dan konfirmasi password tidak sama!");
//       return;
//     }

//     try {
//       await register(nama, email, password, passwordConfirmation);
//       setSuccess("Akun berhasil dibuat! Silakan login.");
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.message || "Terjadi kesalahan, coba lagi.");
//       } else {
//         setError("Terjadi kesalahan, coba lagi.");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-950">
//       <div className="w-full max-w-lg p-6 shadow-lg bg-gray-950 rounded-2xl">
//         <h2 className="mb-6 text-2xl font-semibold text-center text-white">
//           Buat Akun Baru
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {error && <p className="text-red-500">{error}</p>}
//           {success && <p className="text-green-500">{success}</p>}

//           <div>
//             <label className="block mb-1 text-white">Nama Lengkap</label>
//             <input
//               type="text"
//               value={nama}
//               onChange={(e) => setNama(e.target.value)}
//               className="w-full p-2 text-white placeholder-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="nama lengkap kamu"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-white">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 text-white placeholder-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="masukkan email kamu"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-white">Kata Sandi</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 text-white placeholder-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-white">
//               Konfirmasi Kata Sandi
//             </label>
//             <input
//               type="password"
//               value={passwordConfirmation}
//               onChange={(e) => setPasswordConfirmation(e.target.value)}
//               className="w-full p-2 text-white placeholder-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 text-white transition bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
//           >
//             Daftar
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-white">
//           Sudah punya akun?{" "}
//           <Link
//             to="/login"
//             className="font-semibold text-blue-600 hover:underline"
//           >
//             Masuk di sini
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/services/AuthService";
import { User, Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) return setError("Password minimal 8 karakter!");
    if (password !== passwordConfirmation)
      return setError("Konfirmasi password tidak cocok!");

    setLoading(true);
    try {
      await register(nama, email, password, passwordConfirmation);
      setSuccess("Akun berhasil dibuat! Mengalihkan ke login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat akun.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#0a121e] px-6 relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <div className="z-10 w-full max-w-lg">
        {/* Menggunakan rounded-4xl untuk konsistensi desain */}
        <div className="p-10 border border-gray-800 shadow-2xl bg-gray-900/40 backdrop-blur-xl rounded-4xl">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-4xl font-black text-transparent bg-linear-to-r from-white to-indigo-400 bg-clip-text">
              Daftar
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute w-5 h-5 text-gray-500 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 text-white transition-all border border-gray-700 outline-none bg-gray-800/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder="nama lengkap kamu"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-500 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 text-white transition-all border border-gray-700 outline-none bg-gray-800/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder="masukkan email kamu"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="group">
                <label className="block mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                  Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-500 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 text-sm text-white transition-all border border-gray-700 outline-none bg-gray-800/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="Min 8 karakter"
                    required
                  />
                </div>
              </div>
              <div className="group">
                <label className="block mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                  Konfirmasi
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-500 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 text-sm text-white transition-all border border-gray-700 outline-none bg-gray-800/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="Ulangi sandi"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-1 text-xs text-gray-500 hover:text-blue-400"
            >
              {showPassword ? "Sembunyikan Sandi" : "Lihat Kata Sandi"}
            </button>

            {error && (
              <div className="p-4 text-sm text-center text-red-400 border bg-red-500/10 border-red-500/20 rounded-2xl">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 text-sm text-center text-green-400 border bg-green-500/10 border-green-500/20 rounded-2xl">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-500/25 disabled:bg-gray-700"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} /> Daftar Sekarang
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-500">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-400 hover:text-blue-300"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
