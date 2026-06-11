"use client";

import { useId } from "react";
import type { ComponentProps, FC } from "react";

import {
  FileUpload as FileUploadComponent,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FileUploadPreview,
  FileUploadPreviewItem,
} from "@/components/thread-ui/file-upload";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type FileUploadProps = Omit<
  ComponentProps<typeof FileUploadComponent>,
  "children" | "className"
> & {
  label?: string;
  description?: string;
  error?: string;
  preview?: boolean;
  className?: string;
  dropzoneClassName?: string;
  listClassName?: string;
  itemClassName?: string;
};

export const FileUpload: FC<FileUploadProps> = ({
  label,
  description,
  error,
  preview,
  className,
  dropzoneClassName,
  listClassName,
  itemClassName,
  id,
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId =
    error || description ? `${inputId}-description` : undefined;

  return (
    <Field
      className={cn(className)}
      data-disabled={disabled}
      data-invalid={!!error}
    >
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <FileUploadComponent
        {...props}
        aria-describedby={descriptionId}
        aria-invalid={!!error}
        disabled={disabled}
        id={inputId}
      >
        <FileUploadDropzone className={dropzoneClassName} />
        {preview ? (
          <FileUploadPreview className={listClassName}>
            <FileUploadPreviewItem className={itemClassName} />
          </FileUploadPreview>
        ) : (
          <FileUploadList className={listClassName}>
            <FileUploadItem className={itemClassName} />
          </FileUploadList>
        )}
      </FileUploadComponent>

      {(error || description) && (
        <FieldDescription
          className={cn(error && "text-destructive")}
          id={descriptionId}
        >
          {error || description}
        </FieldDescription>
      )}
    </Field>
  );
};
