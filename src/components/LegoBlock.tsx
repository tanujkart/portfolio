"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import React from "react";

export type LegoBlockSize = "sm" | "md" | "lg";
export type LegoBlockVariant =
  | "zinc"
  | "slate"
  | "sky"
  | "blue"
  | "violet"
  | "rose"
  | "amber"
  | "emerald";

export interface LegoBlockProps {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  size?: LegoBlockSize;
  variant?: LegoBlockVariant;
  className?: string;
}

const variantToClasses: Record<LegoBlockVariant, string> = {
  zinc: "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
  slate: "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100",
  sky: "bg-sky-100 text-sky-950 dark:bg-sky-900 dark:text-sky-100",
  blue: "bg-blue-100 text-blue-950 dark:bg-blue-900 dark:text-blue-100",
  violet: "bg-violet-100 text-violet-950 dark:bg-violet-900 dark:text-violet-100",
  rose: "bg-rose-100 text-rose-950 dark:bg-rose-900 dark:text-rose-100",
  amber: "bg-amber-100 text-amber-950 dark:bg-amber-900 dark:text-amber-100",
  emerald: "bg-emerald-100 text-emerald-950 dark:bg-emerald-900 dark:text-emerald-100",
};

const sizeToClasses: Record<LegoBlockSize, string> = {
  sm: "col-span-1 row-span-1",
  md: "md:col-span-2 col-span-1 row-span-1",
  lg: "md:col-span-2 col-span-1 md:row-span-2 row-span-1",
};

export function LegoBlock({
  title,
  description,
  href,
  icon,
  size = "sm",
  variant = "zinc",
  className,
}: LegoBlockProps) {
  const Container = href ? Link : ("div" as any);

  return (
    <Container
      href={href || undefined}
      className={cn(
        "relative isolate rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.4),_0_10px_20px_rgba(0,0,0,.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,.08),_0_10px_20px_rgba(0,0,0,.5)]",
        "ring-1 ring-black/5 dark:ring-white/10",
        variantToClasses[variant],
        sizeToClasses[size],
        "stud-mask",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="stud h-9 w-9 shrink-0 rounded-full bg-white/60 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/15" />
        )}
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-tight">{title}</h3>
          {description && (
            <p className="mt-1 line-clamp-3 text-sm/6 opacity-80">{description}</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default LegoBlock;


