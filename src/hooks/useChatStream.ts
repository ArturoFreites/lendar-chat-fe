/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/ChatMessage";

export default function useChatStream(
    applicationId: number | null,
    onMessage: (msg: ChatMessage) => void
) {
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {

        if (!applicationId) return;
        const url = `${import.meta.env.BE_URL}/chat/${applicationId}/stream`;
        const eventSource = new EventSource(url);

        eventSource.addEventListener("stream:ready", (event) => {
            console.log("🟢 Stream listo:", event.data);
        });

        eventSource.addEventListener("message:new", (event) => {
            try {
                const data: ChatMessage = JSON.parse((event as MessageEvent).data);
                console.log("📩 Mensaje recibido vía SSE:", data);
                onMessage(data);
            } catch (err) {
                console.warn("Error parseando mensaje SSE:", event);
            }
        });

        eventSource.addEventListener("ping", () => {
        });

        eventSource.onerror = (err) => {
            console.error("❌ Error SSE:", err);
            eventSource.close();
        };

        eventSourceRef.current = eventSource;

        return () => {
            console.log("🔴 Cerrando stream SSE");
            eventSource.close();
        };
    }, [applicationId, onMessage]);
}
