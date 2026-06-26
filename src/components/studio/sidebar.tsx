import { BookOpen, ChevronDown, Globe2, Plus, Sparkles, Star, UsersRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BrandMark } from "@/components/studio/brand-mark";
import { sidebarPrimaryItems } from "@/lib/studio-model";
import { cn } from "@/lib/utils";

const supportItems = [
  { label: "Studio Plan", icon: Star },
  { label: "Tutorials", icon: BookOpen },
  { label: "Community", icon: UsersRound },
] as const;

export function Sidebar() {
  return (
    <aside className="flex flex-col border-b border-border bg-sidebar/95 px-5 py-5 shadow-[12px_0_42px_rgba(15,23,42,0.04)] backdrop-blur lg:sticky lg:top-0 lg:min-h-screen lg:border-b-0 lg:border-r lg:py-7">
      <a className="mb-5 flex items-center gap-3 lg:mb-8" href="#" aria-label="MayCreator home">
        <BrandMark />
        <span className="text-[24px] font-black tracking-[-0.02em] text-foreground">
          MayCreator
        </span>
      </a>

      <Button className="mb-5 h-12 justify-center gap-3 rounded-[10px] text-base font-extrabold shadow-[0_18px_36px_rgba(245,158,11,0.22)] lg:mb-7 lg:h-[52px]">
        <Plus data-icon="inline-start" className="size-5" aria-hidden="true" />
        New Project
      </Button>

      <nav className="grid grid-cols-2 gap-2 lg:flex lg:flex-col" aria-label="Primary navigation">
        {sidebarPrimaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex h-11 items-center gap-3 rounded-[10px] px-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:h-[52px] lg:gap-4 lg:px-4 lg:text-[17px]",
                item.active &&
                  "bg-[linear-gradient(90deg,rgba(251,191,36,0.22),rgba(251,191,36,0.06))] text-foreground",
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn("size-5 stroke-[2.2]", item.active && "fill-primary text-primary")}
              />
              {item.label}
            </a>
          );
        })}
      </nav>

      <Separator className="my-8 hidden bg-border lg:block" />

      <nav className="hidden flex-col gap-2 lg:flex" aria-label="Support navigation">
        {supportItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href="#"
              className="flex h-11 items-center gap-4 rounded-[10px] px-4 text-[16px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon aria-hidden="true" className="size-5 stroke-[2.1]" />
              {item.label}
            </a>
          );
        })}
        <a
          href="#"
          className="flex h-11 items-center gap-4 rounded-[10px] px-4 text-[16px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Globe2 aria-hidden="true" className="size-5 stroke-[2.1]" />
          <span>Language</span>
          <span className="ml-auto text-sm font-bold text-foreground">EN</span>
          <ChevronDown aria-hidden="true" className="size-4" />
        </a>
      </nav>

      <div className="mt-auto hidden rounded-[12px] border border-border bg-background p-3 shadow-[0_14px_30px_rgba(15,23,42,0.06)] lg:block">
        <button className="flex w-full items-center gap-3 rounded-[10px] text-left">
          <Avatar className="size-11">
            <AvatarFallback className="bg-muted text-base font-bold text-muted-foreground">
              M
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-foreground">
            May Studio
          </span>
          <ChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 hidden items-center gap-2 rounded-[10px] bg-primary/10 px-3 py-2 text-xs font-bold text-primary lg:flex">
        <Sparkles aria-hidden="true" className="size-4" />
        Frontend-only v1
      </div>
    </aside>
  );
}
