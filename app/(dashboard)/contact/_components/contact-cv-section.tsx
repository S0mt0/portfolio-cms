"use client";

import { useRef, type ChangeEvent } from "react";
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";

import { ModuleCard } from "@/components/common/module-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleUploadDocument } from "@/lib/services/upload.service";

import type { ContactEditorState } from "./contact-editor.types";

export function ContactCvSection({ formData, setFormData }: ContactEditorState) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    handleUploadDocument(event, {
      folder: "documents",
      onComplete: (cvUrl) => {
        setFormData((prev) => ({ ...prev, cvUrl }));
        toast.success("CV uploaded");
      },
      onError: (message) => toast.error(message),
    });
  };

  return (
    <ModuleCard className="h-fit space-y-5 bg-honey/25">
      <div>
        <p className="font-script text-3xl text-tomato">CV document</p>
        <p className="text-sm leading-6 text-ink/60">
          Upload the document visitors can download from the contact page.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper/70 p-4">
        <Label>Current file</Label>
        <div className="mt-3 flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink/15 bg-paper">
            <FileText className="size-5" />
          </span>
          <a
            href={formData.cvUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="truncate text-sm font-bold underline underline-offset-4"
          >
            {formData.cvUrl || "No CV uploaded yet"}
          </a>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={onUpload}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => inputRef.current?.click()}
      >
        <Upload />
        {formData.cvUrl ? "Change CV" : "Upload CV"}
      </Button>
    </ModuleCard>
  );
}
