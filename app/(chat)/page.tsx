"use client";

import * as React from "react";

import { Chat } from "./chat";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { books } from "@/lib/books";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <main className="w-screen h-screen p-6">
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
                            value === book.value ? "opacity-100" : "opacity-0"
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
            <Chat bookValue={value} />
          </div>
          <div className=""></div>
        </div>
      </div>
    </main>
  );
}
