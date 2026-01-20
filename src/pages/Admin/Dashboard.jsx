// export default AdminDashboardLayout;
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Award, LogOut, FileBadge, ChevronRight } from 'lucide-react';
import { getUserData, logout } from '../../utils/services/AuthService'; 

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Manajemen Event', icon: Calendar, path: '/admin/events' },
    { name: 'Manajemen Peserta', icon: Users, path: '/admin/peserta' },
    { name: 'Rekap Absensi', icon: Award, path: '/admin/absensi' },
    { name: 'Generate Sertifikat', icon: FileBadge, path: '/admin/generate' },
];

const AdminDashboardLayout = () => {
    const navigate = useNavigate();
    const user = getUserData();
    const adminName = user?.nama || "Admin Utama";

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const linkClass = ({ isActive }) =>
        `flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group
        ${isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-2' 
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`;

    return (
        <div className="flex min-h-screen bg-[#0a121e] text-white pt-28"> 
            
            {/* ======================== SIDEBAR ======================== */}
            <aside className="w-72 bg-gray-950/50 backdrop-blur-xl h-[calc(90vh-64px)] p-6 border-r border-gray-900 shadow-2xl sticky top-16 shrink-0 flex flex-col">
                <div className="px-2 mb-10">
                    <h2 className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em] mb-4">Main Menu</h2>
                    <div className="p-4 border border-gray-800 bg-gray-900/50 rounded-3xl">
                        <p className="text-sm font-bold text-white truncate">{adminName}</p>
                        <p className="text-[10px] text-gray-500 uppercase mt-1">Super Administrator</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-3">
                    {sidebarItems.map((item) => (
                        <NavLink 
                            key={item.name}
                            end={item.path === '/admin'} 
                            to={item.path}
                            className={linkClass}
                        >
                            <div className="flex items-center">
                                <item.icon className="w-5 h-5 mr-3" />
                                <span className="text-sm font-bold">{item.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 transition-opacity opacity-0 group-hover:opacity-100" />
                        </NavLink>
                    ))}
                </nav>

                <div className="pt-6 mt-auto border-t border-gray-900">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-4 text-red-400 transition-all hover:bg-red-500/10 rounded-2xl group"
                    >
                        <LogOut className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* ======================== KONTEN UTAMA ======================== */}
            <main className="flex-1 p-10 bg-linear-to-br from-[#0a121e] to-gray-950 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardLayout;