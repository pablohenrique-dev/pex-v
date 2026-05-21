"use client";

import { ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type ImageFileInputProps = {
  label: string;
  value?: File | null;
  error?: string;
  maxSizeInMB?: number;
  acceptedTypes?: string[];
  onChange: (file: File | null) => void;
};

export function ImageFileInput({
  label,
  value,
  error,
  maxSizeInMB = 1,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  onChange,
}: ImageFileInputProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  function validateAndSetFile(file: File) {
    if (!acceptedTypes.includes(file.type)) {
      onChange(null);
      return;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      onChange(null);
      return;
    }

    onChange(file);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      onChange(null);
      return;
    }

    validateAndSetFile(file);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    validateAndSetFile(file);
  }

  function formatFileSize(size: number) {
    const sizeInKB = size / 1024;

    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(1)} KB`;
    }

    return `${(sizeInKB / 1024).toFixed(1)} MB`;
  }

  function getFileExtension(fileName: string) {
    return fileName.split(".").pop()?.toUpperCase() ?? "IMG";
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>

      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-card px-4 py-6 text-center transition",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/60 hover:bg-primary/5",
          error && "border-destructive bg-destructive/5",
        )}
      >
        <input
          id={inputId}
          type="file"
          accept={acceptedTypes.join(",")}
          className="sr-only"
          onChange={handleInputChange}
        />

        <div className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
          <UploadCloud className="size-6" />
        </div>

        <p className="mt-4 text-sm font-semibold text-foreground">
          Arraste e solte a imagem aqui
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          ou clique para selecionar uma foto
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          PNG, JPG ou WEBP até {maxSizeInMB}MB
        </p>
      </label>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {value && (
        <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ImageIcon className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {value.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {getFileExtension(value.name)} • {formatFileSize(value.size)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
            aria-label="Remover imagem"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
