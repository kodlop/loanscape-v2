import { Elements } from "./elements";
import { FormDesignerSidebarButton } from "./form-designer-sidebar-button";

export function ElementsSidebar() {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground/70 pb-3">Elements</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <FormDesignerSidebarButton element={Elements.TEXTFIELD} />
      </div>
    </div>
  );
}
