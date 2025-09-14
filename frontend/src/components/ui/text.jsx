import React from "react";
import clsx from "clsx";

/**
 * Simple Text components for consistent typography
 */

export function Title({ className, children, ...props }) {
  return (
    <h2
      className={clsx("text-xl font-bold text-gray-900", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Subtitle({ className, children, ...props }) {
  return (
    <h3
      className={clsx("text-lg font-semibold text-gray-800", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Text({ className, children, ...props }) {
  return (
    <p className={clsx("text-base text-gray-700", className)} {...props}>
      {children}
    </p>
  );
}

export function Muted({ className, children, ...props }) {
  return (
    <span
      className={clsx("text-sm text-gray-500", className)}
      {...props}
    >
      {children}
    </span>
  );
}
