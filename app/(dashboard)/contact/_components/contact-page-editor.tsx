"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateContactPage } from "@/lib/actions/contact.actions";
import type { TContactPageSchema } from "@/lib/schemas/contact.schema";

import { ContactCopySection } from "./contact-copy-section";
import { ContactCvSection } from "./contact-cv-section";
import { ContactEditorActions } from "./contact-editor-actions";
import { ContactSocialsSection } from "./contact-socials-section";

type ContactPageEditorProps = {
  content: TContactPageSchema;
};

export function ContactPageEditor({ content }: ContactPageEditorProps) {
  const [formData, setFormData] = useState<TContactPageSchema>(content);
  const [isPending, startTransition] = useTransition();
  const isDirty = JSON.stringify(formData) !== JSON.stringify(content);
  const editorState = { formData, setFormData };

  const onSubmit = () => {
    startTransition(() => {
      updateContactPage(formData)
        .then((res) => {
          if (res && "error" in res) toast.error(res.error);
          else toast.success("Contact page updated");
        })
        .catch(() => toast.error("Could not update contact page."));
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_25rem]">
      <ContactCopySection {...editorState} />
      <div className="space-y-5">
        <ContactCvSection
          {...editorState}
          isDirty={isDirty}
          isPending={isPending}
          onSubmit={onSubmit}
        />
        <ContactSocialsSection {...editorState} />
      </div>
      <ContactEditorActions
        isDirty={isDirty}
        isPending={isPending}
        onCancel={() => setFormData(content)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
