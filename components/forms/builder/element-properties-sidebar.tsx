import React from "react";
import { X } from "lucide-react";
import { Separator } from "../../ui/separator";
import { useBuilder } from "@/hooks/use-builder";
import { Elements } from "./elements";
import { Button } from "@/components/ui/button";

export function ElementPropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useBuilder();

  if (!selectedElement) return null;

  const PropertiesForm = Elements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2 pt-0">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-foreground/70">
          Element Properties
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedElement(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="mt-2 mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
