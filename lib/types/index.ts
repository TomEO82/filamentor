export type { Database, Json } from "./database";

// Convenience types from database
import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Filament = Database["public"]["Tables"]["filaments"]["Row"];
export type Printer = Database["public"]["Tables"]["printers"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];

// Status types
export type PrinterStatus = "idle" | "printing" | "maintenance" | "offline";
export type OrderStatus =
  | "pending"
  | "in_queue"
  | "printing"
  | "post_processing"
  | "ready"
  | "delivered"
  | "cancelled";

// Filament types
export const FILAMENT_TYPES = [
  "PLA",
  "PETG",
  "ABS",
  "TPU",
  "ASA",
  "Nylon",
  "Other",
] as const;
export type FilamentType = (typeof FILAMENT_TYPES)[number];

// Part types
export const PART_TYPES = [
  "Nozzle",
  "Belt",
  "Fan",
  "Hotend",
  "Extruder",
  "Bed",
  "Other",
] as const;
export type PartType = (typeof PART_TYPES)[number];
