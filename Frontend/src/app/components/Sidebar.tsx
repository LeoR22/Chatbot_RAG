"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="relative flex">
            {/* Botón para abrir/cerrar (siempre visible) */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-4 left-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all ${isSidebarOpen ? "translate-x-64" : "translate-x-0"
                    }`}
            >
                {isSidebarOpen ? <FaArrowLeft size={16} /> : <FaArrowRight size={16} />}
            </button>

            {/* Barra lateral */}
            <aside
                className={`bg-gray-200 dark:bg-gray-800 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-80" : "w-0 overflow-hidden"
                    }`}
            >
                {/* Encabezado fijo */}
                <div className="flex items-center mb-6 p-4 sticky top-0 bg-gray-200 dark:bg-gray-800 z-10 shadow-md">
                    <img
                        src="/log.png"
                        alt="Logo"
                        className="w-10 h-10 mr-4 dark:invert"
                    />
                    <h2 className="text-lg font-bold">DataGenie</h2>
                </div>

            </aside>
        </div>
    );
};
