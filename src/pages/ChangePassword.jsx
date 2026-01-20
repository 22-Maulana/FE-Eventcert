// src/pages/ChangePassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react'; // Import ikon
import { changePassword } from '../utils/services/AuthService'; // Sudah di-import dan akan digunakan

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (formData.new_password !== formData.new_password_confirmation) {
            setError("Konfirmasi password baru tidak cocok.");
            setLoading(false);
            return;
        }

        try {
            // Panggil fungsi changePassword yang telah kita buat
            await changePassword(formData);

            setLoading(false);
            setSuccess("Password berhasil diubah!");
            
            // Opsional: Redirect atau minta user login ulang
            // navigate('/login'); 

        } catch (error) {
            setError(error.response?.data?.message || "Gagal mengganti password.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-20 bg-gray-950 text-white">
            <div className="max-w-xl mx-auto p-8 bg-gray-800 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-extrabold mb-8 text-blue-400 border-b border-gray-700 pb-3 flex items-center gap-2">
                    <Lock className="w-7 h-7" /> Ganti Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField label="Password Saat Ini" name="current_password" type="password" value={formData.current_password} onChange={handleChange} />
                    <InputField label="Password Baru" name="new_password" type="password" value={formData.new_password} onChange={handleChange} />
                    <InputField label="Konfirmasi Password Baru" name="new_password_confirmation" type="password" value={formData.new_password_confirmation} onChange={handleChange} />

                    {error && <div className="p-3 bg-red-800 rounded text-red-300">{error}</div>}
                    {success && <div className="p-3 bg-green-800 rounded text-green-300">{success}</div>}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-200"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ganti Password'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/profile')} 
                        className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition duration-200"
                    >
                        Batal
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, name, type = 'text', value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

export default ChangePassword;