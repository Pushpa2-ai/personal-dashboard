import React from "react";
import clsx from "clsx";

/**
 * Simple reusable Card components
 * Similar to shadcn/ui card but lightweight
 */

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-white shadow-md border border-gray-200 p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={clsx("mb-2 font-semibold text-lg", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={clsx("text-gray-700", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={clsx("mt-2 pt-2 border-t border-gray-200", className)} {...props}>
      {children}
    </div>
  );
}
