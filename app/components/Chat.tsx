"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>(
        [{ from: "bot", text: "¡Hola! ¿En qué puedo ayudarte?" }]
    );
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        setMessages((msgs) => [
            ...msgs,
            { from: "user", text: trimmed },
            { from: "bot", text: "no se jaja saludos" }
        ]);
        setInput("");
    };

    return (
        <>
            {/* Chatbot overlay */}
            {open && (
                <div
                    className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col"
                    style={{ minWidth: 320, minHeight: 380 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-3 rounded-t bg-gradient-to-r from-red-900 to-red-500 text-white hover:from-red-800 hover:to-red-500 transition-all">
                        <span className="font-semibold">Chatbot</span>
                        <button
                            className="text-white hover:text-gray-300"
                            onClick={() => setOpen(false)}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                    </div>
                    {/* Chatbot content */}
                    <div className="flex-1 p-4 overflow-auto space-y-2">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={
                                    msg.from === "user"
                                        ? "text-right"
                                        : "text-left"
                                }
                            >
                                <span
                                    className={
                                        msg.from === "user"
                                            ? "inline-block bg-gradient-to-r from-red-900 to-red-500 text-white hover:from-red-800 hover:to-red-500 transition-all rounded-lg px-3 py-1 mb-1"
                                            : "inline-block bg-gray-200 text-gray-800 rounded-lg px-3 py-1 mb-1"
                                    }
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* Input */}
                    <form
                        onSubmit={handleSend}
                        className="flex items-center p-2 gap-2"
                    >
                        <input
                            type="text"
                            className="flex-1 rounded-full border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Escribe tu mensaje..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    handleSend(e as any);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-red-900 to-red-500 text-white hover:from-red-800 hover:to-red-500 transition-all rounded-full px-4 py-2"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            )}

            {/* Chat bubble button */}
            <button
                className="cursor-pointer fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg hover:scale-105 transition-transform"
                style={{ width: 64, height: 64 }}
                onClick={() => setOpen((v) => !v)}
                aria-label="Abrir chat"
            >
                <Image
                    className="w-full h-full object-cover rounded-full"
                    src="/assets/chatbot.webp"
                    alt="Chat Image"
                    width={48}
                    height={48}
                />
            </button>
        </>
    );
}