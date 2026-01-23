import type { ComponentProps, FC } from "react";
import {
  RadioGroup as RadioGroupComponent,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type RadioGroupItemProps = {
  label: string;
  description?: string;
  value: string;
  disabled?: boolean;
};

export type RadioGroupProps = ComponentProps<typeof RadioGroupComponent> & {
  label?: string;
  description?: string;
  items: RadioGroupItemProps[];
};

export const RadioGroup: FC<RadioGroupProps> = ({
  className,
  label,
  description,
  disabled,
  items,
  ...props
}) => {
  return (
    <FieldSet className={cn(className)}>
      {label && <FieldLegend variant="label">{label}</FieldLegend>}
      {description && <FieldDescription>{description}</FieldDescription>}

      <RadioGroupComponent disabled={disabled} {...props}>
        {items.map((item) => (
          <Field
            key={item.value}
            data-disabled={disabled || item.disabled}
            orientation="horizontal"
          >
            <RadioGroupItem disabled={item.disabled} value={item.value} />
            <FieldContent>
              {item.label && <FieldLabel>{item.label}</FieldLabel>}
              {item.description && (
                <FieldDescription>{item.description}</FieldDescription>
              )}
            </FieldContent>
          </Field>
        ))}
      </RadioGroupComponent>
    </FieldSet>
  );
};
