import type { ComponentProps, FC, ReactNode } from "react";

import { Button } from "@/components/fabric-ui/button";
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  Empty as EmptyRoot,
  EmptyTitle,
} from "@/components/ui/empty";

export type EmptyActionProps = Omit<
  ComponentProps<typeof Button>,
  "children"
> & {
  "data-testid"?: string;
  icon?: ReactNode;
  label: ReactNode;
};

export type EmptyProps = Omit<
  ComponentProps<typeof EmptyRoot>,
  "children" | "title"
> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  primaryAction?: EmptyActionProps;
  secondaryAction?: EmptyActionProps;
};

const EmptyActionButton: FC<EmptyActionProps> = ({ icon, label, ...props }) => (
  <Button {...props}>
    {icon}
    {label}
  </Button>
);

export const Empty: FC<EmptyProps> = ({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  ...props
}) => (
  <EmptyRoot {...props}>
    <EmptyHeader>
      {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
      <EmptyTitle>{title}</EmptyTitle>
      {description && <EmptyDescription>{description}</EmptyDescription>}
    </EmptyHeader>

    {(primaryAction || secondaryAction) && (
      <EmptyContent className="flex-row flex-wrap justify-center gap-2">
        {primaryAction && <EmptyActionButton {...primaryAction} />}
        {secondaryAction && (
          <EmptyActionButton variant="outline" {...secondaryAction} />
        )}
      </EmptyContent>
    )}
  </EmptyRoot>
);
