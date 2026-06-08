"use client";

import Image from "next/image";
import type { ChangeEvent, RefObject } from "react";
import { ImagePlus, Save, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "../ui/switch";

type FieldProps = {
  label: string;
  name?: string;
  defaultValue?: string;
  hint?: string;
  className?: string;
  maxLength?: number;
  onChange: (value: string) => void;
};

export function TextField({
  label,
  name,
  defaultValue,
  hint,
  className,
  maxLength,
  onChange,
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        value={defaultValue}
        onChange={(event) => onChange(event.target.value)}
      />
      {maxLength ? (
        <p className="text-xs text-muted-foreground">
          {defaultValue?.length}/{maxLength} characters
        </p>
      ) : null}
      {hint ? <p className="text-xs leading-5 text-ink/55">{hint}</p> : null}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  hint,
  className,
  maxLength,
  onChange,
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        value={defaultValue}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-32 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      {maxLength ? (
        <p className="text-xs text-muted-foreground">
          {defaultValue?.length}/{maxLength} characters
        </p>
      ) : null}
      {hint ? <p className="text-xs leading-5 text-ink/55">{hint}</p> : null}
    </div>
  );
}

export function ImagePicker({
  label,
  value,
  inputRef,
  hint,
  onUpload,
  className,
  containerClassName,
}: {
  label: string;
  value: string;
  hint?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  className?: string;
}) {
  return (
    <div className="grid min-w-0 content-start gap-2">
      <Label>{label}</Label>
      {hint ? <p className="text-xs leading-5 text-ink/55">{hint}</p> : null}
      <div className="overflow-hidden rounded-xl border bg-muted">
        {value ? (
          <div className={cn("relative h-52", containerClassName)}>
            <Image
              src={value}
              alt={label}
              className={cn("object-cover object-center", className)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
            />
          </div>
        ) : (
          <div className="flex h-52 flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImagePlus className="h-8 w-8" />
            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/heic,image/heif"
        className="hidden"
        onChange={onUpload}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        {value ? "Change image" : "Upload image"}
      </Button>
    </div>
  );

  // Add support for abort controller
}

export function SaveButton({
  onSubmit,
  isPending,
  className,
  label = "Save Changes",
  disabled = false,
}: {
  onSubmit: () => void;
  isPending: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      className={cn("w-full", className)}
      size="lg"
      onClick={onSubmit}
      disabled={isPending || disabled}
    >
      <Save />
      {isPending ? "Chill out bro 😏..." : label}
    </Button>
  );
}

export function PublishSwitch({
  checked,
  onChange,
  hint,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border px-4 py-3 transition-colors",
        checked
          ? "border-honey/45 bg-honey/15 dark:border-tomato/45 dark:bg-tomato/10"
          : "bg-muted/20"
      )}
    >
      <div>
        <Label>{checked ? "Published" : "Draft"}</Label>
        {hint ? <p className="text-xs leading-5 text-ink/55">{hint}</p> : null}
        {/* <p className="text-xs text-muted-foreground">
          Draft items stay saved but hidden from the website.
        </p> */}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="cursor-pointer"
      />
    </div>
  );
}
