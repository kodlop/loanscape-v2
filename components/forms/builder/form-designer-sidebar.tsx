import { useBuilder } from "@/hooks/use-builder";
import { ElementsSidebar } from "./elements-sidebar";
import { ElementPropertiesSidebar } from "./element-properties-sidebar";

export function FormDesignerSidebar() {
  const { selectedElement } = useBuilder();

  return (
    <aside className="w-[400px] max-w-[400px] h-full flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background">
      {!selectedElement && <ElementsSidebar />}
      {selectedElement && <ElementPropertiesSidebar />}
    </aside>
  );
}
