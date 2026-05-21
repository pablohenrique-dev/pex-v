import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextInput({
  label,
  error,
  id,
  className,
  ...props
}: TextInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        id={inputId}
        className={[
          "h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition",
          "placeholder:text-muted-foreground",
          "focus:border-primary focus:ring-4 focus:ring-primary/15",
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/15"
            : "border-border",
          className,
        ].join(" ")}
        {...props}
      />

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
