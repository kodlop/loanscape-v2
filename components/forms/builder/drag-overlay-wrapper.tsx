import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, Elements } from "../builder/elements";
import { useBuilder } from "@/hooks/use-builder";
import { FormDesignerSidebarButtonDragOverlay } from "./form-designer-sidebar-button";

export function DragOverlayWrapper() {
  const { elements } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isDesignerSidebarButton =
    draggedItem?.data?.current?.isDesignerSidebarButton;

  if (isDesignerSidebarButton) {
    const type: ElementsType = draggedItem?.data?.current?.type;
    node = <FormDesignerSidebarButtonDragOverlay element={Elements[type]} />;
  }

  const isFormDesignerElement =
    draggedItem?.data?.current?.isFormDesignerElement;

  if (isFormDesignerElement) {
    const formElementId = draggedItem?.data?.current?.formElementId;
    const element = elements.find((element) => element.id === formElementId);
    if (!element) node = <div>Form element not found</div>;
    else {
      const DesignerComponent = Elements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-sm w-full opacity-60 p-2 pointer-events-none">
          <DesignerComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}
