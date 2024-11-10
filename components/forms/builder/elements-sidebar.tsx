import { Elements } from "./elements";
import { FormDesignerSidebarButton } from "./form-designer-sidebar-button";

export function ElementsSidebar() {
  return (
    <div className="space-y-4">
      <div className="">
        <p className="text-sm font-semibold text-foreground/70 pb-2">
          Layout Elements
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <FormDesignerSidebarButton element={Elements.TITLEFIELD} />
          <FormDesignerSidebarButton element={Elements.SUBTITLEFIELD} />
          <FormDesignerSidebarButton element={Elements.PARAGRAPHFIELD} />
          <FormDesignerSidebarButton element={Elements.SEPARATORFIELD} />
        </div>
      </div>
      <div className="">
        <p className="text-sm font-semibold text-foreground/70 pb-2">
          Form Elements
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <FormDesignerSidebarButton element={Elements.TEXTFIELD} />
          <FormDesignerSidebarButton element={Elements.NUMBERFIELD} />
          <FormDesignerSidebarButton element={Elements.TEXTAREAFIELD} />
        </div>
      </div>
    </div>
  );
}
