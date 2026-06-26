"use client";

import Image from "next/image";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Download,
  Info,
  LayoutPanelLeft,
  Settings,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  aspectRatios,
  generationModes,
  studioFunctions,
  type AspectRatio,
  type DraftStatus,
  type GeneratedPreviewState,
  type GenerationMode,
  type StudioFunctionOption,
  type UploadedAssetMetadata,
} from "@/lib/studio-model";

const MAX_PROMPT_LENGTH = 1000;

const initialPreview: GeneratedPreviewState = {
  status: "sample",
  mode: "try-on",
  prompt: "",
  generatedAtLabel: "Just now",
};

export function StudioComposer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<GenerationMode>("try-on");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [selectedFunction, setSelectedFunction] = useState(studioFunctions[0]);
  const [prompt, setPrompt] = useState("");
  const [uploadedAsset, setUploadedAsset] = useState<UploadedAssetMetadata | null>(null);
  const [preview, setPreview] = useState<GeneratedPreviewState>(initialPreview);
  const [downloadStatus, setDownloadStatus] = useState("Download All");

  const activeMode = useMemo(
    () => generationModes.find((item) => item.value === mode) ?? generationModes[0],
    [mode],
  );

  const activeAspectRatio = useMemo(
    () => aspectRatios.find((item) => item.value === aspectRatio) ?? aspectRatios[0],
    [aspectRatio],
  );

  const isPromptReady = prompt.trim().length > 0;
  const visiblePreview = preview.status !== "cleared";

  function handleModeChange(value: string) {
    if (value === "try-on" || value === "spec") {
      setMode(value);
      setPreview((current) => ({ ...current, mode: value }));
    }
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadedAsset({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    });
  }

  function handleGenerate() {
    if (!isPromptReady) return;

    setPreview({
      status: "generated",
      mode,
      prompt: prompt.trim(),
      generatedAtLabel: "Just now",
    });
    setDownloadStatus("Download All");
  }

  function handleClear() {
    setPreview({
      status: "cleared",
      mode,
      prompt: "",
      generatedAtLabel: "Cleared",
    });
  }

  function handleDownload() {
    setDownloadStatus("Queued");
  }

  return (
    <section
      className="rounded-[14px] border border-border bg-background/96 p-6 shadow-[var(--studio-shadow)] backdrop-blur sm:p-7"
      aria-label="Image generation composer"
    >
      <div className="flex flex-col gap-7">
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={handleModeChange}
          className="grid w-full max-w-[640px] grid-cols-1 overflow-hidden rounded-[12px] border border-border bg-background p-1 shadow-[0_12px_28px_rgba(15,23,42,0.04)] sm:grid-cols-2"
          aria-label="Generation type"
        >
          {generationModes.map((item) => {
            const Icon = item.icon;

            return (
              <ToggleGroupItem
                key={item.value}
                value={item.value}
                data-testid={`mode-${item.value}`}
                aria-label={item.label}
                className="h-[52px] rounded-[10px] border border-transparent text-[15px] font-extrabold text-muted-foreground data-[state=on]:border-primary/35 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-[inset_0_0_0_1px_rgba(246,164,0,0.18)]"
              >
                <Icon aria-hidden="true" className="size-5 data-[icon=true]:size-5" />
                <span className="truncate">{item.label}</span>
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="product-prompt"
            className="flex items-center gap-2 text-[16px] font-extrabold text-foreground"
          >
            Product Prompt
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  aria-label="Prompt guidance"
                  className="size-4 text-muted-foreground"
                  role="img"
                />
              </TooltipTrigger>
              <TooltipContent>
                Describe the product, materials, fit, target pet, and marketplace use.
              </TooltipContent>
            </Tooltip>
          </label>

          <div className="relative rounded-[12px] border border-input bg-background shadow-[0_14px_34px_rgba(15,23,42,0.04)] transition-colors focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/15">
            <Textarea
              id="product-prompt"
              value={prompt}
              maxLength={MAX_PROMPT_LENGTH}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe your product in detail..."
              className="min-h-[158px] resize-y border-0 px-5 py-5 pb-12 text-[17px] font-medium leading-7 shadow-none focus-visible:ring-0 md:text-[17px]"
            />
            <span
              className="absolute bottom-4 right-5 text-sm font-bold text-muted-foreground"
              aria-live="polite"
              data-testid="character-count"
            >
              {prompt.length} / {MAX_PROMPT_LENGTH}
            </span>
          </div>
        </div>

        <div className="grid items-center gap-4 lg:grid-cols-[160px_minmax(0,1fr)_180px]">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleUploadChange}
              aria-label="Upload source image"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex h-[72px] w-full items-center justify-center gap-3 rounded-[12px] border border-dashed border-input bg-background px-4 text-left transition-colors hover:border-primary hover:bg-accent/60"
            >
              <Upload aria-hidden="true" className="size-7 stroke-[2.1]" />
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-extrabold text-foreground">Upload</span>
                <span
                  className="truncate text-xs font-semibold text-muted-foreground"
                  data-testid="uploaded-file-name"
                >
                  {uploadedAsset ? uploadedAsset.name : "Image (Optional)"}
                </span>
              </span>
            </button>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(210px,270px)_72px_minmax(230px,1fr)] lg:grid-cols-[minmax(170px,220px)_64px_minmax(190px,1fr)]">
            <AspectRatioDropdown activeAspectRatio={activeAspectRatio} onSelect={setAspectRatio} />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  aria-label="Generation settings"
                  className="h-[64px] w-full rounded-[12px] border-input bg-background shadow-[0_10px_22px_rgba(15,23,42,0.05)]"
                >
                  <Settings aria-hidden="true" className="size-6 stroke-[2.1]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Generation settings are local-only in v1.</TooltipContent>
            </Tooltip>

            <FunctionDropdown selectedFunction={selectedFunction} onSelect={setSelectedFunction} />
          </div>

          <Button
            type="button"
            disabled={!isPromptReady}
            onClick={handleGenerate}
            className="h-[64px] rounded-[12px] text-[17px] font-black shadow-[0_18px_36px_rgba(245,158,11,0.26)] disabled:shadow-none"
            data-testid="generate-button"
          >
            <Sparkles aria-hidden="true" className="size-5 fill-current" />
            Generate
          </Button>
        </div>

        {visiblePreview ? (
          <GeneratedPreview
            mode={activeMode.label}
            preview={preview}
            downloadStatus={downloadStatus}
            onDownload={handleDownload}
            onClear={handleClear}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPreview(initialPreview)}
            className="rounded-[12px] border border-dashed border-border bg-muted/45 px-5 py-4 text-left text-sm font-bold text-muted-foreground transition-colors hover:border-primary hover:bg-accent/40"
          >
            Preview cleared. Restore sample generated output.
          </button>
        )}
      </div>

      <p className="sr-only" aria-live="polite" data-testid="local-state-summary">
        {uploadedAsset ? `Uploaded ${uploadedAsset.name}.` : "No uploaded image."}{" "}
        {activeMode.label}. {selectedFunction.label}. {activeAspectRatio.label}.
      </p>
    </section>
  );
}

function AspectRatioDropdown({
  activeAspectRatio,
  onSelect,
}: {
  activeAspectRatio: { value: AspectRatio; label: string };
  onSelect: (value: AspectRatio) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-[64px] w-full justify-start rounded-[12px] border-input bg-background px-5 text-[16px] font-extrabold shadow-[0_10px_22px_rgba(15,23,42,0.05)]"
          aria-label="Aspect ratio"
        >
          <LayoutPanelLeft aria-hidden="true" className="size-5" />
          <span className="min-w-0 flex-1 truncate text-left">{activeAspectRatio.label}</span>
          <ChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px] rounded-[12px]">
        <DropdownMenuGroup>
          {aspectRatios.map((item) => (
            <DropdownMenuItem key={item.value} onClick={() => onSelect(item.value)}>
              <span className="flex-1">{item.label}</span>
              {item.value === activeAspectRatio.value ? <Check aria-hidden="true" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FunctionDropdown({
  selectedFunction,
  onSelect,
}: {
  selectedFunction: StudioFunctionOption;
  onSelect: (value: StudioFunctionOption) => void;
}) {
  const Icon = selectedFunction.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-[64px] w-full justify-start rounded-[12px] border-input bg-background px-5 text-[16px] font-extrabold shadow-[0_10px_22px_rgba(15,23,42,0.05)]"
          aria-label="Function selection"
        >
          <Icon aria-hidden="true" className="size-5" />
          <span className="min-w-0 flex-1 truncate text-left">{selectedFunction.label}</span>
          <ChevronDown aria-hidden="true" className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px] rounded-[12px]">
        <DropdownMenuGroup>
          {studioFunctions.map((item) => {
            const OptionIcon = item.icon;

            return (
              <DropdownMenuItem
                key={item.value}
                onClick={() => onSelect(item)}
                className="items-start gap-3 py-3"
              >
                <OptionIcon aria-hidden="true" className="mt-0.5 size-4" />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-bold">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </span>
                {item.value === selectedFunction.value ? (
                  <Check aria-hidden="true" className="mt-1" />
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GeneratedPreview({
  mode,
  preview,
  downloadStatus,
  onDownload,
  onClear,
}: {
  mode: string;
  preview: GeneratedPreviewState;
  downloadStatus: string;
  onDownload: () => void;
  onClear: () => void;
}) {
  const statusLabel = getStatusLabel(preview.status);

  return (
    <section
      className="rounded-[12px] border border-border bg-background p-4 shadow-[0_18px_44px_rgba(15,23,42,0.07)]"
      aria-label="Generated preview samples"
      data-testid="result-panel"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Badge className="gap-2 rounded-[9px] bg-studio-teal-soft px-3 py-1.5 text-[15px] font-black text-studio-teal">
            <Check aria-hidden="true" className="size-4" />
            {statusLabel}
          </Badge>
          <span className="text-sm font-semibold text-muted-foreground">
            {preview.generatedAtLabel}
          </span>
          <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">
            {mode}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDownload}
            className="h-9 rounded-[9px] border-input bg-background font-extrabold"
          >
            <Download aria-hidden="true" className="size-4" />
            {downloadStatus}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-9 rounded-[9px] font-extrabold text-muted-foreground hover:text-foreground"
          >
            <Trash2 aria-hidden="true" className="size-4" />
            Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.04fr_1.12fr]">
        <PreviewFrame
          title="Listing Image"
          src="/studio/listing-preview.png"
          alt="Generated listing image preview with a small dog and olive pet carrier"
        />
        <PreviewFrame
          title="Spec Sheet"
          src="/studio/spec-preview.png"
          alt="Generated product specification preview with pet carrier feature callouts"
        />
      </div>
    </section>
  );
}

function PreviewFrame({ title, src, alt }: { title: string; src: string; alt: string }) {
  return (
    <article className="relative aspect-video overflow-hidden rounded-[12px] border border-border bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        sizes="(min-width: 1024px) 520px, 100vw"
        className="object-cover"
      />
      <span className="absolute left-3 top-3 rounded-[7px] bg-background/88 px-3 py-1.5 text-xs font-black text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.08)] backdrop-blur">
        {title}
      </span>
      <span className="absolute bottom-3 right-3 rounded-[7px] bg-background/88 px-2.5 py-1 text-xs font-black text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.08)] backdrop-blur">
        16:9
      </span>
    </article>
  );
}

function getStatusLabel(status: DraftStatus) {
  if (status === "generated") return "Generated";
  if (status === "ready") return "Draft Ready";
  return "Generated";
}
