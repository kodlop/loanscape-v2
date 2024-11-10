import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { Element } from "../builder/elements";
import { useDraggable } from "@dnd-kit/core";

interface FormDesignerSidebarButtonProps {
  element: Element;
}
export function FormDesignerSidebarButton({
  element,
}: FormDesignerSidebarButtonProps) {
  const { icon: Icon, label } = element.designerButton;

  const draggable = useDraggable({
    id: `form-designer-sidebar-button-${element.type}`,
    data: {
      type: element.type,
      isDesignerSidebarButton: true,
    },
  });

  return (
    <div
      ref={draggable.setNodeRef}
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "flex flex-col gap-y-2 h-16",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="w-9 h-9" />
      <p className="text-xs">{label}</p>
    </div>
  );
}

export function FormDesignerSidebarButtonDragOverlay({
  element,
}: FormDesignerSidebarButtonProps) {
  const { icon: Icon, label } = element.designerButton;

  // const draggable = useDraggable({
  //   id: `form-designer-sidebar-button-${element.type}`,
  //   data: {
  //     type: element.type,
  //     isDesignerSidebarButton: true,
  //   },
  // });

  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "flex flex-col gap-y-2 h-16"
      )}
    >
      <Icon className="w-9 h-9" />
      <p className="text-xs">{label}</p>
    </div>
  );
}
