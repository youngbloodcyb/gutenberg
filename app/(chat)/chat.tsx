"use client";

import ChatMessages from "./chat-messages";
import { useChat, Message } from "ai/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.object({
  book: z.string({
    required_error: "Please select a book.",
  }),
  prompt: z.string().nonempty({
    message: "Please enter a prompt.",
  }),
});

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <>
      <ChatMessages messages={messages} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="book"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Book</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[400px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? books.find((book) => book.value === field.value)
                              ?.label
                          : "Select a book"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search books..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {books.map((book) => (
                          <CommandItem
                            value={book.label}
                            key={book.value}
                            onSelect={() => {
                              form.setValue("book", book.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                book.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {book.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the book you will be chatting with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Enter a prompt..."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your prompt to chat with the books.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
