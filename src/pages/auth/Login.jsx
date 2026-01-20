// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../utils/services/AuthService";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await login(email, password);
//       localStorage.setItem("access_token", data.access_token);
//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         setError("Email atau password salah!");
//       } else {
//         setError("Terjadi kesalahan, coba lagi nanti.");
//       }
//       console.log(err.response.data);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-950">
//       <div className="w-full max-w-lg p-6 shadow-lg bg-gray-950 rounded-2xl">
//         <h2 className="mb-6 text-2xl font-semibold text-center text-white">
//           Masuk ke Akunmu
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {error && <p className="text-red-500">{error}</p>}

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

//           <button
//             type="submit"
//             className="w-full py-2 text-white transition bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
//           >
//             Masuk
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-white">
//           Belum punya akun?{" "}
//           <Link
//             to="/register"
//             className="font-semibold text-blue-600 hover:underline"
//           >
//             Daftar di sini
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, me } from "../../utils/services/AuthService";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access_token);
      await me(); // Sinkronkan data user ke localStorage
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Email atau password salah!"
          : "Terjadi kesalahan server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a121e] px-6 relative overflow-hidden">
      {/* Glow Background selaras dengan tema Navy */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="z-10 w-full max-w-md">
        {/* Menggunakan rounded-4xl agar selaras dengan Event Card */}
        <div className="p-10 border border-gray-800 shadow-2xl bg-gray-900/40 backdrop-blur-xl rounded-4xl shadow-blue-500/5">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-4xl font-black text-transparent bg-linear-to-r from-white to-blue-500 bg-clip-text">
              Masuk
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Alamat Email
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

            <div className="group">
              <label className="block mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-500 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-4 pl-12 pr-12 text-white transition-all border border-gray-700 outline-none bg-gray-800/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-500 -translate-y-1/2 right-4 top-1/2 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 text-sm font-medium text-center text-red-400 border bg-red-500/10 border-red-500/20 rounded-2xl animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-500">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-400 transition-colors hover:text-blue-300"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
