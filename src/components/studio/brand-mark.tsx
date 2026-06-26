import { PawPrint } from "lucide-react";

export function BrandMark() {
  return (
    <span className="flex size-10 items-center justify-center rounded-[10px] bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(245,158,11,0.26)]">
      <PawPrint aria-hidden="true" className="size-6 fill-current stroke-[2.4]" />
    </span>
  );
}
