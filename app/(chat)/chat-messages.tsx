import { Message } from "ai";
import { useRef } from "react";

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="mb-3 flex flex-grow flex-col justify-end overflow-y-scroll rounded-lg text-sm">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="slide-in-bottom message-glow my-2 flex rounded-md border p-3 transition-shadow duration-200"
        >
          <div className="flex items-center p-2">
            {msg.role === "assistant" ? "🤖" : "🧑‍💻"}
          </div>
          <div className="ml-2 flex items-center">{msg.content}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
