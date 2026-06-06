"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tools = [
  { label: "B", action: "toggleBold" as const, active: "bold" },
  { label: "I", action: "toggleItalic" as const, active: "italic" },
  { label: "H2", action: "toggleHeading" as const, active: "heading" },
  { label: "List", action: "toggleBulletList" as const, active: "bulletList" },
];

export function TiptapNoteEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content:
      "<h2>Draft a note</h2><p>Write the idea in simple language first. Make the security or engineering lesson easy to follow.</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] rounded-2xl border border-ink/15 bg-paper/90 p-5 text-base leading-8 outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.label}
            type="button"
            variant={editor.isActive(tool.active) ? "default" : "outline"}
            size="sm"
            className={cn(tool.label.length <= 2 && "min-w-10")}
            onClick={() => {
              if (tool.action === "toggleHeading") {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                return;
              }
              editor.chain().focus()[tool.action]().run();
            }}
          >
            {tool.label}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
