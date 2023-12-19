import { Message } from "ai";
import { useRef } from "react";

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-grow flex-col justify-end overflow-y-scroll rounded-lg p-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.role === "assistant" ? "text-green-300" : "text-blue-300"
          } slide-in-bottom message-glow my-2 flex rounded border p-3 shadow-md transition-shadow duration-200 hover:shadow-lg`}
        >
          <div className="flex items-center rounded-tl-lg p-2">
            {msg.role === "assistant" ? "🤖" : "🧑‍💻"}
          </div>
          <div className="ml-2 flex items-center text-gray-200">
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
