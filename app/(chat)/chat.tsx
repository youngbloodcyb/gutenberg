"use client";

type ContextItem = {
  id: string;
  score: number;
  source: string;
  text: string;
};

import React from "react";

import ChatMessages from "./chat-messages";
import { useChat, Message } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ContextItem from "./context-item";
import { Check, ChevronsUpDown } from "lucide-react";
import { books } from "@/lib/books";

import { cn } from "@/lib/utils";

export function Chat() {
  const [gotMessages, setGotMessages] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [bookValue, setBookValue] = React.useState<string | undefined>("");
  const [context, setContext] = React.useState<ContextItem[]>([]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { bookValue },
    onFinish: async () => {
      setGotMessages(true);
    },
  });

  const prevMessagesLengthRef = React.useRef(messages.length);

  React.useEffect(() => {
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({
          messages,
          bookValue,
        }),
      });
      const { context } = await response.json();
      setContext(
        context.map((c: any) => ({
          id: c.id,
          score: c.score,
          source: c.metadata.source,
          text: c.metadata.text,
        }))
      );
    };
    if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
      getContext();
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, gotMessages]);

  return (
    <div className="border rounded-md h-full">
      <div className="p-6 flex justify-between items-center">
        <h1>gutenberg.chat</h1>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[400px] justify-between"
              >
                {bookValue
                  ? books.find((book) => book.value === bookValue)?.label
                  : "Select a book..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No book found.</CommandEmpty>
                <CommandGroup>
                  {books.map((book) => (
                    <CommandItem
                      key={book.value}
                      value={book.value}
                      onSelect={(currentValue) => {
                        setBookValue(
                          currentValue === bookValue ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      {book.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          bookValue === book.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator />
      <div className="h-full w-full grid grid-cols-4 p-6">
        <div className="border col-span-3 rounded-md">
          <div className="p-6 ">
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
        </div>
        <div className="cols-span-1 pl-6 space-y-4">
          {context.map((c) => (
            <ContextItem
              key={c.id}
              score={c.score}
              source={c.source}
              text={c.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
