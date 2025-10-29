import { useEffect, useState } from "react";
import { api } from "../api";
import type { ChatMessage } from "../types/ChatMessage";
import type { PaginationResponse } from "../types/PaginationResponse";
import type { QrResponse } from "../types/QrResponse";

export default function useChatHistory(applicationId: number | null) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMessages = async (nextPage = 0) => {
        if (!applicationId) return;
        setLoading(true);

        try {
            const res = await api.get<QrResponse<PaginationResponse<ChatMessage>>>(
                `/chat?eq=applicationId:${applicationId}&sort=createdAt:desc&page=${nextPage}`
            );

            const data = res.data.data;
            setMessages((prev) => [...data.results, ...prev]); // prepend mensajes antiguos
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Error cargando mensajes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (applicationId) {
            setMessages([]);
            fetchMessages(0);
        }
    }, [applicationId]);

    return { messages, loading, page, totalPages, fetchMessages };
}
