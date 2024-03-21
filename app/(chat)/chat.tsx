"use client";

import React from "react";

import ChatMessages from "./chat-messages";
import { useChat, Message } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Chat({ bookValue }: { bookValue: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { bookValue },
  });
  return (
    <>
      <div className="p-6">
        <ChatMessages messages={messages} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            className="resize-none"
            placeholder="Enter a prompt..."
            value={input}
            onChange={handleInputChange}
            // {...field}
          />

          <Button type="submit" disabled={bookValue ? false : true}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
