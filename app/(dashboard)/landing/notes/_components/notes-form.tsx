"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  SaveButton,
  TextareaField,
  TextField,
} from "@/components/common/form-controls";
import { ModuleCard } from "@/components/common/module-card";
import { Button } from "@/components/ui/button";
import { updateLandingNotes } from "@/lib/actions/landing.actions";
import type { TLandingSelectedNotesSchema } from "@/lib/schemas/landing.schema";
import type { LandingContent } from "@/lib/types/landing";

type NotesFormProps = LandingContent["selectedNotes"];

const toPayload = ({
  eyebrow,
  title,
  linkLabel,
  linkHref,
}: NotesFormProps): TLandingSelectedNotesSchema => ({
  eyebrow,
  title,
  linkLabel,
  linkHref,
});

export function NotesForm(props: NotesFormProps) {
  const router = useRouter();
  const initialPayload = toPayload(props);
  const [formData, setFormData] =
    useState<TLandingSelectedNotesSchema>(initialPayload);
  const [isPending, startTransition] = useTransition();
  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialPayload);

  const onCancel = () => setFormData(initialPayload);

  const onSubmit = () => {
    startTransition(() => {
      updateLandingNotes(formData)
        .then((res) => {
          if (res && "error" in res) toast.error(res.error);
          else {
            toast.success("Save success");
            router.refresh();
          }
        })
        .catch((error) =>
          toast.error(error?.error ?? "Something went wrong, try again.")
        );
    });
  };

  return (
    <ModuleCard className="max-w-2xl space-y-5">
      <TextField
        label="Eyebrow"
        defaultValue={formData.eyebrow}
        onChange={(eyebrow) => setFormData((prev) => ({ ...prev, eyebrow }))}
      />
      <TextareaField
        label="Title"
        defaultValue={formData.title}
        onChange={(title) => setFormData((prev) => ({ ...prev, title }))}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Link label"
          defaultValue={formData.linkLabel}
          onChange={(linkLabel) =>
            setFormData((prev) => ({ ...prev, linkLabel }))
          }
        />
        <TextField
          label="Link href"
          defaultValue={formData.linkHref}
          onChange={(linkHref) =>
            setFormData((prev) => ({ ...prev, linkHref }))
          }
        />
      </div>
      <p className="rounded-xl border border-ink/10 bg-muted/30 px-4 py-3 text-sm leading-6 text-ink/60">
        Featured notes will come from note records marked as featured. This page
        only controls the section copy and archive link.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {isDirty ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full flex-1"
            onClick={onCancel}
          >
            <RotateCcw />
            Cancel
          </Button>
        ) : null}
        <SaveButton
          isPending={isPending}
          onSubmit={onSubmit}
          disabled={!isDirty}
          className="flex-1"
        />
      </div>
    </ModuleCard>
  );
}
