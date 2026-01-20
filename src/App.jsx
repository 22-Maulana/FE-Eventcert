import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Navbar & Footer
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Halaman umum
import Home from "./pages/Home";
import Events from "./pages/Event";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FormPendaftaran from "./pages/FormPendaftaran";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import MyEvents from "./pages/MyEvents";
import Certificate from "./pages/Certificate";

// ===================== HALAMAN ADMIN =====================
import AdminDashboardLayout from "./pages/Admin/Dashboard";
import AdminOverview from "./pages/Admin/Overview"; // DashboardHome

// EVENT
import EventIndex from "./pages/Admin/event/Index";
import EventCreate from "./pages/Admin/event/Create";
import EventEdit from "./pages/Admin/event/Edit";

// PESERTA
import PesertaIndex from "./pages/Admin/Participants";

// TEMPLATE / OTOMASI SERTIFIKAT
import SertifikatIndex from "./pages/Admin/template/Index";

// ABSENSI
import RekapAbsensi from "./pages/Admin/absensi/Index";

// GENERATE SERTIFIKAT (MENU BARU)
import GenerateIndex from "./pages/Admin/generate/Index";
import ManageGenerate from "./pages/Admin/generate/Manage";

// CSS
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <main className="min-h-screen text-gray-800 bg-gray-100">
        <Routes>
          {/* ===================== PUBLIC ===================== */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/form-pendaftaran/:eventId" element={<FormPendaftaran />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/password" element={<ChangePassword />} />

          <Route path="/my-events" element={<MyEvents />} />

          <Route path="/sertifikat/:eventId" element={<Certificate />} />

          {/* ===================== ADMIN ===================== */}
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<AdminOverview />} />

            {/* EVENT */}
            <Route path="events" element={<EventIndex />} />
            <Route path="events/create" element={<EventCreate />} />
            <Route path="events/edit/:id" element={<EventEdit />} />

            {/* PESERTA */}
            <Route path="peserta" element={<PesertaIndex />} />

            {/* ABSENSI */}
            <Route path="absensi" element={<RekapAbsensi />} />

            {/* OTOMASI TEMPLATE SERTIFIKAT */}
            <Route path="sertifikat" element={<SertifikatIndex />} />

            {/* MENU BARU: GENERATE SERTIFIKAT */}
            <Route path="generate" element={<GenerateIndex />} />
            <Route path="generate/:id" element={<ManageGenerate />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
