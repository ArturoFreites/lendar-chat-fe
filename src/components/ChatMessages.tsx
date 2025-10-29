import dayjs from "dayjs";
import type { ChatMessage } from "../types/ChatMessage";

interface Props {
    messages: ChatMessage[];
    userId: number;
}

// 🎨 Paleta de colores solo para los nombres de los autores
const authorNameColors = [
    "text-rose-500",
    "text-amber-600",
    "text-emerald-600",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
    "text-sky-600",
];

export default function ChatMessages({ messages, userId }: Props) {
    // Asigna un color único a cada autor por su ID
    const colorMap = new Map<number, string>();
    let colorIndex = 0;

    const getColorForAuthor = (authorId: number) => {
        if (!colorMap.has(authorId)) {
            const color = authorNameColors[colorIndex % authorNameColors.length];
            colorMap.set(authorId, color);
            colorIndex++;
        }
        return colorMap.get(authorId)!;
    };

    return (
        <div className="flex flex-col gap-3 p-4">
            {messages.map((msg) => {
                const isMine = msg.author?.id === userId;
                const authorId = msg.author?.id ?? 0;
                const authorColor = getColorForAuthor(authorId);

                return (
                    <div
                        key={msg.id}
                        className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm ${isMine
                                    ? "bg-brand-cyan-400 text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none"
                                }`}
                        >
                            {/* Nombre del autor (solo si no soy yo) */}
                            {!isMine && (
                                <div
                                    className={`text-xs font-semibold mb-1 ${authorColor}`}
                                >
                                    {msg.author
                                        ? `${msg.author.name} ${msg.author.lastName}`
                                        : "Usuario"}
                                </div>
                            )}

                            {/* Mensaje */}
                            <div className="break-words">{msg.body}</div>

                            {/* Fecha y hora */}
                            <div
                                className={`text-[10px] mt-1 text-right ${isMine ? "text-green-50" : "text-gray-400"
                                    }`}
                            >
                                {dayjs(msg.createdAt).format("DD/MM/YYYY HH:mm")}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
