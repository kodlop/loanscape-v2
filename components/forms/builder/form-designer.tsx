"use client";

import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { ElementInstance, Elements, ElementsType } from "../builder/elements";
import { idGenerator } from "@/lib/idGenerator";
import { useBuilder } from "@/hooks/use-builder";
import { ElementWrapper } from "./element-wrapper";
import { FormDesignerSidebar } from "./form-designer-sidebar";

export function FormDesigner() {
  const {
    elements,
    setElements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useBuilder();

  const droppable = useDroppable({
    id: "form-designer-drop-area",
    data: {
      isFormDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isFormDesignerSidebarButton =
        active.data?.current?.isDesignerSidebarButton;
      const isDroppingOverFromDesignerDropArea =
        over.data?.current?.isFormDesignerDropArea;

      if (isFormDesignerSidebarButton && isDroppingOverFromDesignerDropArea) {
        const type = active.data?.current?.type;
        const newFormElement = Elements[type as ElementsType].construct(
          idGenerator()
        );
        console.log(newFormElement);
        addElement(elements.length, newFormElement);

        return;
      }

      const droppingDesignerSidebarElementTopHalf =
        over.data?.current?.isTopHalfFormDesignerElement;

      const droppingDesignerSidebarElementBottomHalf =
        over.data?.current?.isBottomHalfFormDesignerElement;

      const isDroppingOverFormDesignerElement =
        droppingDesignerSidebarElementTopHalf ||
        droppingDesignerSidebarElementBottomHalf;

      const droppingFormDesignerSidebarButtonOverFormDesignerElement =
        isFormDesignerSidebarButton && isDroppingOverFormDesignerElement;

      if (droppingFormDesignerSidebarButtonOverFormDesignerElement) {
        const type = active.data?.current?.type;
        const newFormElement = Elements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.formElementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        let indexForNewElement = overElementIndex;

        if (overElementIndex === -1) throw new Error("Element not found");

        if (droppingDesignerSidebarElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newFormElement);

        return;
      }

      const isDraggingDesignerElement =
        active.data?.current?.isFormDesignerElement;

      const draggingFormDesignerElementOverAnotherFormDesignerElement =
        isDroppingOverFormDesignerElement && isDraggingDesignerElement;

      if (draggingFormDesignerElementOverAnotherFormDesignerElement) {
        const activeId = active.data?.current?.formElementId;
        const overId = over.data?.current?.formElementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1) throw new Error("Element not found");
        if (overElementIndex === -1) throw new Error("Element not found");

        const activeElement = { ...elements[activeElementIndex] };

        // removeElement(activeId);
        let updatedElements = [...elements];
        // remove element from old position
        updatedElements = updatedElements.filter(
          (_, index) => _.id !== activeId
        );

        let indexForNewElement = overElementIndex;
        if (droppingDesignerSidebarElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        updatedElements.splice(indexForNewElement, 0, activeElement);

        setElements(updatedElements);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div
        className="w-full p-2"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background w-full min-h-96 mx-auto rounded-md flex flex-col flex-grow items-center justify-start flex-1",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-32 rounded-sm bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="p-4 flex flex-col w-full gap-2">
              {elements.map((element: ElementInstance) => (
                <ElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <FormDesignerSidebar />
    </div>
  );
}
