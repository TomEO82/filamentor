"use client";

import { Printer } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4 md:hidden">
      <MobileNav />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-2 font-semibold">
          <Printer className="h-6 w-6" />
          <span className="text-xl">Filamentor</span>
        </div>
      </div>
      {/* Spacer to center the logo */}
      <div className="w-10" />
    </header>
  );
}
