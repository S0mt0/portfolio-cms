import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  className?: string;
};

export function TextField({
  label,
  name,
  defaultValue,
  hint,
  className,
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} defaultValue={defaultValue} />
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
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="min-h-32 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      {hint ? <p className="text-xs leading-5 text-ink/55">{hint}</p> : null}
    </div>
  );
}
