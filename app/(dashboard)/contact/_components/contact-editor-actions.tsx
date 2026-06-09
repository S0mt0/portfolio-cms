"use client";

import { RotateCcw } from "lucide-react";

import { SaveButton } from "@/components/common/form-controls";
import { Button } from "@/components/ui/button";

type ContactEditorActionsProps = {
  isDirty: boolean;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export function ContactEditorActions({
  isDirty,
  isPending,
  onCancel,
  onSubmit,
}: ContactEditorActionsProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-ink/10 pt-5 md:flex-row md:justify-end xl:col-span-2">
      {isDirty ? (
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          <RotateCcw />
          Cancel
        </Button>
      ) : null}
      <SaveButton
        className="md:w-auto"
        isPending={isPending}
        disabled={!isDirty}
        label="Save contact page"
        onSubmit={onSubmit}
      />
    </div>
  );
}
