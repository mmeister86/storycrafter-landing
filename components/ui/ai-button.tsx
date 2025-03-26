"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipText?: string;
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const AiButton = forwardRef<HTMLButtonElement, AiButtonProps>(
  (
    {
      tooltipText = "Get Help from AI",
      className,
      iconClassName,
      tooltipClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative flex h-8 w-8 items-center justify-center rounded-none border-2 border-amber-500 bg-black font-mono text-amber-500 hover:bg-amber-900/30 hover:text-amber-300",
          className
        )}
        aria-label={tooltipText}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn("h-5 w-5", iconClassName)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
        <span
          className={cn(
            "absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap border border-amber-500 bg-black px-2 py-1 text-xs font-mono text-amber-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
            tooltipClassName
          )}
        >
          {tooltipText}
        </span>
      </button>
    );
  }
);

AiButton.displayName = "AiButton";

export { AiButton };
