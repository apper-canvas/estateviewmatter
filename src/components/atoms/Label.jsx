import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-neutral-700 mb-1.5",
        className
      )}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;