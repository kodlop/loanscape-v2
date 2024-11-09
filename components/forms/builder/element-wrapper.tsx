import { ElementsType, ElementInstance, Elements } from "../builder/elements";
import { useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilder } from "@/hooks/use-builder";

export function ElementWrapper({ element }: { element: ElementInstance }) {
  const { removeElement, setSelectedElement } = useBuilder();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      formElementId: element.id,
      isTopHalfFormDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      formElementId: element.id,
      isBottomHalfFormDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      formElementId: element.id,
      isFormDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerComponent =
    Elements[element.type as ElementsType].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative flex flex-col text-foreground hover:cursor-pointer"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn("absolute top-0 w-full h-1/2 rounded-t-sm")}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-sm"
      ></div>
      {mouseIsOver && (
        <div className="w-full bg-accent h-full z-10">
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full"
              variant="destructive"
              size="icon"
              onClick={(event) => {
                event.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for poperties of drag to move
            </p>
          </div>
        </div>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-sm h-2 bg-primary rounded-b-none"></div>
      )}
      <div
        className={cn(
          "w-full p-2 rounded-sm opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerComponent elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-sm h-2 bg-primary rounded-t-none"></div>
      )}
    </div>
  );
}
