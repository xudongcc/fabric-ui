import type { ComponentProps, FC } from "react";
import {
  CheckboxGroup as CheckboxGroupComponent,
  CheckboxGroupItem,
} from "@/components/thread-ui/checkbox-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type CheckboxGroupItemProps = {
  label: string;
  description?: string;
  value?: string;
  disabled?: boolean;
};

export type CheckboxGroupItemParentProps = {
  label: string;
  description?: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = Omit<
  ComponentProps<typeof CheckboxGroupComponent>,
  "allValues"
> & {
  name?: string;
  label?: string;
  description?: string;
  items: Array<CheckboxGroupItemProps>;
  parent?: CheckboxGroupItemParentProps;
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  className,
  name,
  label,
  description,
  disabled,
  items,
  parent,
  ...props
}) => {
  return (
    <FieldSet className={cn(className)}>
      {label && <FieldLegend variant="label">{label}</FieldLegend>}
      {description && <FieldDescription>{description}</FieldDescription>}

      <CheckboxGroupComponent
        disabled={disabled}
        allValues={items
          .map((item) => item.value)
          .filter((value) => typeof value === "string")}
        {...props}
      >
        {parent && (
          <Field
            data-disabled={disabled || parent.disabled}
            orientation="horizontal"
          >
            <CheckboxGroupItem parent disabled={parent.disabled} />
            <FieldContent>
              {parent.label && <FieldLabel>{parent.label}</FieldLabel>}
              {parent.description && (
                <FieldDescription>{parent.description}</FieldDescription>
              )}
            </FieldContent>
          </Field>
        )}

        {items.map((item) => (
          <Field
            key={item.value}
            data-disabled={disabled || item.disabled}
            orientation="horizontal"
          >
            <CheckboxGroupItem
              disabled={item.disabled}
              name={name}
              value={item.value}
            />
            <FieldContent>
              {item.label && <FieldLabel>{item.label}</FieldLabel>}
              {item.description && (
                <FieldDescription>{item.description}</FieldDescription>
              )}
            </FieldContent>
          </Field>
        ))}
      </CheckboxGroupComponent>
    </FieldSet>
  );
};
