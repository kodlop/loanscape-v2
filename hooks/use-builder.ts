import { BuilderContext } from "@/context/BuilderContext";
import { useContext } from "react";

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error(
      "useFormDesigner must be used within a FormDesignerProvider"
    );
  }

  return context;
}
