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
    <div className="border rounded-md text-sm p-4">
      <h3>{(score * 100).toFixed(2)}%</h3>
      {/* <a className="text-xs border-b" href={source}>
        {source}
      </a> */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="text">
          <AccordionTrigger className="text-xs">Source text</AccordionTrigger>
          <AccordionContent className="text-xs">{text}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
