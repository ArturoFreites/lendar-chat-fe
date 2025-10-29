import { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";

interface Props {
    onSelect: (applicationId: number, userId: number) => void;
}

export default function ChatSelector({ onSelect }: Props) {
    const [applicationId, setApplicationId] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const appId = Number(applicationId);
        const usrId = Number(userId);

        // Validaciones detalladas
        if (!appId && !usrId) {
            setError("Por favor, ingresa el Application ID y el User ID.");
            return;
        }

        if (!appId) {
            setError("Dale vigilante pone un Application ID válido.");
            return;
        }

        if (!usrId) {
            setError("Pone un UserId valido.");
            return;
        }

        if (usrId < 1 || usrId > 6) {
            setError("Jajaja te dije del 1 al 6 que hdp");
            return;
        }

        setError("");
        onSelect(appId, usrId);
    };

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-white shadow-lg p-8 rounded-xl w-80 border border-gray-200"
            >
                <div className="w-full flex items-center justify-center mb-2">
                    <img
                        className="w-28"
                        src="https://backoffice.lendar.com.ar/assets/images/lendar-logos/lendar-logo-mask-1.svg"
                        alt="Lendar Logo"
                    />
                </div>

                <h2 className="text-lg font-semibold text-center text-gray-800">
                    Ingresar al chat Lendar
                </h2>

                {/* Application ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Application ID
                    </label>
                    <input
                        type="number"
                        placeholder="Ej: 1697"
                        value={applicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-brand-cyan-400 outline-none"
                    />
                </div>

                {/* User ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        User ID (1 a 6)
                    </label>
                    <input
                        type="number"
                        placeholder="Ej: 1"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-brand-cyan-400 outline-none"
                    />
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md px-3 py-2">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-brand-cyan-400 text-white py-2 rounded-md hover:bg-brand-cyan-600 transition"
                >
                    <LogIn size={16} /> Conectar
                </button>
            </form>
        </div>
    );
}
