// import React from "react";
// // 1. Import ikon umum dari lucide-react
// import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
// import { FaTiktok } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="text-white bg-gray-900 body-font">
//       <div className="container grid grid-cols-1 gap-8 px-6 py-12 mx-auto md:px-12 md:grid-cols-4">
//         {/* Logo & Deskripsi */}
//         <div className="flex flex-col space-y-4">
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl font-semibold">EventCert</span>
//           </div>
//           <p className="text-sm leading-relaxed text-gray-400">
//             Platform modern untuk manajemen event dan sertifikat digital secara
//             efisien dan aman.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div className="ml-8">
//           <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li>
//               <Link to="/" className="transition hover:text-white">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/events" className="transition hover:text-white">
//                 Event
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="transition hover:text-white">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="transition hover:text-white">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="mb-4 text-lg font-bold">Contact</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li>
//               <span className="font-semibold text-white">Email:</span>{" "}
//               support@eventcert.id
//             </li>
//             <li>
//               <span className="font-semibold text-white">Phone:</span> +62 812
//               3456 7890
//             </li>
//             <li>
//               <span className="font-semibold text-white">Location:</span>{" "}
//               Surabaya, Indonesia
//             </li>
//           </ul>
//         </div>

//         {/* Follow Us */}
//         {/* Follow Us */}
//         <div>
//           <h3 className="mb-4 text-lg font-bold">Follow Us</h3>

//           {/* Social Media Icons */}
//           <div className="flex gap-4 mb-6">
//             {/* Instagram */}
//             <a
//               href="#"
//               className="p-2 transition bg-gray-800 rounded-full hover:bg-pink-600"
//             >
//               <Instagram size={20} />
//             </a>

//             {/* Twitter / X */}
//             <a
//               href="#"
//               className="p-2 transition bg-gray-800 rounded-full hover:bg-blue-400"
//             >
//               <Twitter size={20} />
//             </a>

//             {/* TikTok */}
//             <a
//               href="#"
//               className="p-2 transition bg-gray-800 rounded-full hover:bg-black hover:text-pink-500"
//             >
//               <FaTiktok size={20} />
//             </a>

//             {/* Facebook */}
//             <a
//               href="#"
//               className="p-2 transition bg-gray-800 rounded-full hover:bg-blue-600"
//             >
//               <Facebook size={20} />
//             </a>

//             {/* LinkedIn */}
//             <a
//               href="#"
//               className="p-2 transition bg-gray-800 rounded-full hover:bg-blue-700"
//             >
//               <Linkedin size={20} />
//             </a>
//           </div>

//           {/* App Store Buttons */}
//           <div className="flex space-x-4">
//             <a href="#">
//               <img
//                 src="/images/playstore.png"
//                 alt="Play Store"
//                 className="h-10 hover:opacity-80"
//               />
//             </a>
//             <a href="#">
//               <img
//                 src="/images/appstore.png"
//                 alt="App Store"
//                 className="h-10 hover:opacity-80"
//               />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="py-4 border-t border-gray-700">
//         <p className="text-sm text-center text-gray-400">
//           © 2025 EventCert. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white bg-[#0a121e] border-t border-gray-800">
      <div className="container grid grid-cols-1 gap-12 px-6 py-16 mx-auto md:px-12 md:grid-cols-4">
        {/* Logo & Deskripsi */}
        <div className="flex flex-col space-y-5">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-white">
              EventCert
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Platform modern untuk manajemen event dan sertifikat digital secara
            efisien dan aman. Tingkatkan kredibilitas event Anda bersama kami.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:ml-auto">
          <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-200 uppercase">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link
                to="/"
                className="inline-block transition duration-300 hover:text-blue-500 active:text-blue-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="inline-block transition duration-300 hover:text-blue-500 active:text-blue-700"
              >
                Event
              </Link>
            </li>
            <li className="text-gray-500 cursor-default">About</li>
            <li className="text-gray-500 cursor-default">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:ml-auto">
          <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-200 uppercase">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center space-x-3 group">
              <Mail
                size={16}
                className="text-blue-500 transition-colors group-hover:text-blue-400"
              />
              <span className="transition-colors group-hover:text-gray-200">
                support@eventcert.id
              </span>
            </li>
            <li className="flex items-center space-x-3 group">
              <Phone
                size={16}
                className="text-blue-500 transition-colors group-hover:text-blue-400"
              />
              <span className="transition-colors group-hover:text-gray-200">
                +62 812 3456 7890
              </span>
            </li>
            <li className="flex items-start space-x-3 group">
              <MapPin
                size={16}
                className="mt-1 text-blue-500 transition-colors group-hover:text-blue-400"
              />
              <span className="transition-colors group-hover:text-gray-200">
                Surabaya, Indonesia
              </span>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="md:ml-auto">
          <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-200 uppercase">
            Follow Us
          </h3>
          <div className="flex flex-wrap gap-3">
            {/* Efek interaktif: hover mencerahkan, active/saat ditekan memberikan efek scale down dan warna lebih gelap */}
            <a
              href="#"
              className="p-2.5 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-full hover:bg-blue-600 active:scale-90 active:bg-blue-800 group shadow-lg"
            >
              <Instagram size={18} className="group-hover:animate-pulse" />
            </a>
            <a
              href="#"
              className="p-2.5 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-full hover:bg-blue-400 active:scale-90 active:bg-blue-600 group shadow-lg"
            >
              <Twitter size={18} className="text-white" />
            </a>
            <a
              href="#"
              className="p-2.5 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-full hover:bg-black active:scale-90 active:bg-gray-900 group shadow-lg"
            >
              <FaTiktok size={18} />
            </a>
            <a
              href="#"
              className="p-2.5 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-full hover:bg-blue-700 active:scale-90 active:bg-blue-900 group shadow-lg"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2.5 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-full hover:bg-blue-800 active:scale-90 active:bg-blue-950 group shadow-lg"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-8 border-t border-gray-800 bg-[#080e18]">
        <div className="container flex flex-col items-center px-6 mx-auto">
          <div className="w-24 h-px mb-4 bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium text-center">
            © 2025{" "}
            <span className="font-bold text-blue-500 transition-colors cursor-default hover:text-blue-400">
              EventCert
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
