import type { LucideIcon } from "lucide-react";
import { FileSliders, Home, ImageIcon, Layers3, PawPrint, Sparkles, Upload } from "lucide-react";

export type GenerationMode = "try-on" | "spec";

export type AspectRatio = "1:1" | "4:5" | "16:9" | "9:16";

export type DraftStatus = "sample" | "ready" | "generated" | "cleared";

export interface UploadedAssetMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface GeneratedPreviewState {
  status: DraftStatus;
  mode: GenerationMode;
  prompt: string;
  generatedAtLabel: string;
}

export interface GenerationModeOption {
  value: GenerationMode;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface AspectRatioOption {
  value: AspectRatio;
  label: string;
}

export interface StudioFunctionOption {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const generationModes: GenerationModeOption[] = [
  {
    value: "try-on",
    label: "Pet Model Try-On",
    description: "Stage products with natural fit, scale, and pet-friendly context.",
    icon: PawPrint,
  },
  {
    value: "spec",
    label: "Product Spec Sheet",
    description: "Create clean callouts for materials, features, and sizing.",
    icon: FileSliders,
  },
];

export const aspectRatios: AspectRatioOption[] = [
  { value: "16:9", label: "16:9 (Landscape)" },
  { value: "1:1", label: "1:1 (Square)" },
  { value: "4:5", label: "4:5 (Marketplace)" },
  { value: "9:16", label: "9:16 (Vertical)" },
];

export const studioFunctions: StudioFunctionOption[] = [
  {
    value: "listing",
    label: "Create Listing Images",
    description: "Generate marketplace-ready product visuals.",
    icon: Sparkles,
  },
  {
    value: "spec",
    label: "Build Spec Sheet",
    description: "Generate a structured specification image.",
    icon: Layers3,
  },
  {
    value: "upload",
    label: "Enhance Uploaded Image",
    description: "Use an uploaded source image as composition input.",
    icon: Upload,
  },
];

export const sidebarPrimaryItems = [
  { label: "Home", icon: Home, active: false },
  { label: "Projects", icon: ImageIcon, active: false },
  { label: "Skills", icon: Layers3, active: false },
  { label: "Pets", icon: PawPrint, active: true },
  { label: "Assets", icon: ImageIcon, active: false },
] as const;
