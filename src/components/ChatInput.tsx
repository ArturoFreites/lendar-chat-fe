import { useState } from "react";
import { api } from "../api";
import { Send } from "lucide-react";

interface Props {
    applicationId: number;
    userId: number;
    onSent: () => void;
}

export default function ChatInput({ applicationId, userId, onSent }: Props) {
    const [text, setText] = useState("");

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        // Nuevo formato según ChatMessageRequest
        await api.post("/chat", {
            body: text,
            applicationId,
            userId, // 👈 Cambiado (antes era authorId)
        });

        setText("");
        onSent();
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-gray-200 p-3 bg-white"
        >
            <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-cyan-600"
            />
            <button
                type="submit"
                className="p-2 bg-brand-cyan-400 text-white rounded-full hover:bg-brand-cyan-600 transition"
            >
                <Send size={18} />
            </button>
        </form>
    );
}
