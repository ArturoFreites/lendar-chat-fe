import { useState, useEffect, useRef } from "react";
import ChatSelector from "./components/ChatSelector";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import useChatStream from "./hooks/useChatStream";
import useChatHistory from "./hooks/useChatHistory";
import type { ChatMessage } from "./types/ChatMessage";

function App() {
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const { messages, fetchMessages, totalPages, page } = useChatHistory(applicationId);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🔁 Suscripción al stream (mensajes en tiempo real)
  useChatStream(applicationId, (newMsg) => {
    setLiveMessages((prev) => {
      const exists = prev.some((m) => m.id === newMsg.id);
      return exists ? prev : [...prev, newMsg];
    });
  });

  // 🔽 Fusionar mensajes históricos + nuevos y ordenarlos ascendente
  const allMessages = [...messages, ...liveMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // 🔽 Auto-scroll hacia el final
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages.length]);

  // 🔄 Reiniciar mensajes en vivo al cambiar de chat
  useEffect(() => {
    setLiveMessages([]);
  }, [applicationId]);

  // 🧩 Callback que recibe ambos IDs desde el selector
  const handleSelect = (appId: number, usrId: number) => {
    setApplicationId(appId);
    setUserId(usrId);
  };

  // 🧱 Pantalla de selección de chat
  if (!applicationId || !userId) return <ChatSelector onSelect={handleSelect} />;

  return (
    <div className="flex flex-col h-[100vh] bg-gray-100">
      {/* Header */}
      <div className="bg-brand-cyan-400 text-white py-3 px-4 shadow-sm flex items-center justify-between">
        <h1 className="font-semibold text-lg">
          Chat de aplicación #{applicationId}
        </h1>
        <span className="text-sm opacity-90">Usuario #{userId}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-gray-100">
        {page < totalPages - 1 && (
          <button
            onClick={() => fetchMessages(page + 1)}
            className="block mx-auto my-2 text-sm text-teal-500 underline"
          >
            Cargar mensajes anteriores
          </button>
        )}
        <ChatMessages messages={allMessages} userId={userId} />
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        applicationId={applicationId}
        userId={userId}
        onSent={() => { }}
      />
    </div>
  );
}

export default App;
