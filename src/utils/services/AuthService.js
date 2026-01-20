// src/utils/services/AuthService.js

import api from "../api"; // Asumsi path ini benar

const TOKEN_KEY = "access_token";
const USER_DATA_KEY = "user_data";

// =========================================================
// UTILITY FUNCTIONS UNTUK MENGELOLA TOKEN & DATA USER
// =========================================================

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const removeAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
};

// Cek apakah user sedang login (ada token di localStorage).
export const isLoggedIn = () => {
    return !!getToken();
};

export const getUserData = () => {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
};


// =========================================================
// AUTHENTICATION API CALLS
// =========================================================

export const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    
    // Simpan token setelah login berhasil
    if (response.data && response.data.access_token) {
        saveToken(response.data.access_token);
    }

    return response.data;
};

export const register = async (nama, email, password, password_confirmation) => {
    const response = await api.post("/auth/register", {
        nama,
        email,
        password,
        password_confirmation,
    });
    return response.data;
};

export const logout = () => {
    removeAuthData(); 
};

export const me = async () => {
    const response = await api.get("/auth/me");
    
    // Simpan data user setelah berhasil diambil
    if (response.data) {
         localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
    }
    
    return response.data;
};

// =========================================================
// NEW AUTHENTICATION API CALLS (Untuk Profile Update)
// =========================================================

// Placeholder untuk Update Profile
export const updateProfile = async (data) => {
    console.log("Simulasi API Call: Updating Profile with data:", data);
    return new Promise(resolve => setTimeout(resolve, 500));
};

// Placeholder untuk Change Password
export const changePassword = async (data) => {
    console.log("Simulasi API Call: Changing Password with data:", data);
    return new Promise(resolve => setTimeout(resolve, 500));
};