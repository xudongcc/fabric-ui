"use client";

import type { ComponentProps, FC, ReactNode } from "react";

import {
  SelectContent,
  SelectItem,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type SelectItemProps = {
  label: ReactNode;
  value: string;
};

export type SelectProps = ComponentProps<typeof SelectRoot> & {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  items: Array<SelectItemProps>;
  className?: string;
};

export const Select: FC<SelectProps> = ({
  label,
  description,
  error,
  placeholder,
  items,
  className,
  disabled,
  ...props
}) => {
  return (
    <Field
      className={cn(className)}
      data-disabled={disabled}
      data-invalid={!!error}
    >
      {label && <FieldLabel>{label}</FieldLabel>}

      <SelectRoot disabled={disabled} items={items} {...props}>
        <SelectTrigger aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      {(error || description) && (
        <FieldDescription className={cn(error && "text-destructive")}>
          {error || description}
        </FieldDescription>
      )}
    </Field>
  );
};
