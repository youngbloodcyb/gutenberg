type ContextItem = {
  id?: string;
  score: number;
  source: string;
  text: string;
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContextItem({ score, source, text }: ContextItem) {
  return (
    <div className="border rounded-md text-sm">
      <h3>
        Score: <span>{(score * 100).toFixed(2)}%</span>
      </h3>
      <p className="text-xs">
        Source: <span className="border-b">{source}</span>
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="text">
          <AccordionTrigger className="text-sm">Source text</AccordionTrigger>
          <AccordionContent className="text-sm">{text}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
