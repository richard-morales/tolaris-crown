/**
 * UI/Button
 * - Lightweight, accessible button that accepts Tailwind classes.
 * - Provides a "brand" variant using your tokens.
 * - Maintains focus visibility and disabled states.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "brand";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors outline-none";
    const focus =
      "focus-visible:ring-[3px] focus-visible:ring-offset-0 focus-visible:ring-black/15";
    const disabledStyles =
      "disabled:opacity-50 disabled:pointer-events-none";

    // Brand variant (champagne/burgundy via tokens)
    const brand =
      "bg-champagne text-burgundy hover:bg-champagne/90 active:bg-champagne/80";

    const def =
      "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700";

    return (
      <button
        ref={ref}
        className={cn(base, focus, disabledStyles, variant === "brand" ? brand : def, className)}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
