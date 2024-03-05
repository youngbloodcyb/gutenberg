"use client";

import React from "react";

import ChatMessages from "./chat-messages";
import { useChat, Message } from "ai/react";

import { Check, ChevronsUpDown } from "lucide-react";
import { books } from "@/lib/books";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <>
      <div className="w-[400px]">
        <ChatMessages messages={messages} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[400px] justify-between"
              >
                {value
                  ? books.find((book) => book.value === value)?.label
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
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {book.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === book.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Textarea
            className="resize-none"
            placeholder="Enter a prompt..."
            value={input}
            onChange={handleInputChange}
            // {...field}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}
