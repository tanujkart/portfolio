import React from "react";
import { LegoBlock, LegoBlockProps } from "@/components/LegoBlock";

export interface BlockGridProps {
  blocks: LegoBlockProps[];
}

export function BlockGrid({ blocks }: BlockGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 auto-rows-[minmax(120px,auto)]">
      {blocks.map((block, idx) => (
        <LegoBlock key={`${block.title}-${idx}`} {...block} />)
      )}
    </div>
  );
}

export default BlockGrid;


