import { EllipsisVertical } from "lucide-react";
import type { ComponentProps, FC, ReactElement, ReactNode } from "react";
import { Button } from "@/components/fabric-ui/button";
import {
  PageActions,
  PageBackAction,
  Page as PageComponent,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/thread-ui/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PageBackActionProps = ComponentProps<typeof PageBackAction>;
export type PageActionProps = {
  disabled?: boolean;
  icon?: ReactElement;
  label: string;
  onClick?: () => void;
  render?: ReactElement;
};

export type PageProps = ComponentProps<typeof PageComponent> & {
  title: ReactNode;
  description?: ReactNode;
  backAction?: PageBackActionProps;
  primaryAction?: PageActionProps;
  secondaryActions?: Array<PageActionProps>;
};

export const Page: FC<PageProps> = ({
  children,
  title,
  description,
  backAction,
  primaryAction,
  secondaryActions,
  ...props
}) => {
  return (
    <PageComponent {...props}>
      <PageHeader>
        {backAction && <PageBackAction {...backAction} />}
        <PageTitle>{title}</PageTitle>
        {description && <PageDescription>{description}</PageDescription>}

        {(primaryAction ||
          (secondaryActions && secondaryActions?.length > 0)) && (
          <>
            {/* Desktop */}
            <PageActions className="hidden @md/page:flex">
              {secondaryActions?.map((action, index) => (
                <Button
                  key={action.label ?? index}
                  disabled={action.disabled}
                  render={action.render}
                  variant="secondary"
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}

              {primaryAction && (
                <Button
                  key={primaryAction.label}
                  disabled={primaryAction.disabled}
                  render={primaryAction.render}
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.icon}
                  {primaryAction.label}
                </Button>
              )}
            </PageActions>

            {/* Mobile */}
            <PageActions className="flex @md/page:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="icon" variant="secondary">
                      <EllipsisVertical />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  {primaryAction && (
                    <DropdownMenuItem
                      key={primaryAction.label}
                      disabled={primaryAction.disabled}
                      render={primaryAction.render}
                      onClick={primaryAction.onClick}
                    >
                      {primaryAction.icon}
                      {primaryAction.label}
                    </DropdownMenuItem>
                  )}

                  {secondaryActions?.map((action, index) => (
                    <DropdownMenuItem
                      key={action.label ?? index}
                      disabled={action.disabled}
                      render={action.render}
                      onClick={action.onClick}
                    >
                      {action.icon}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </PageActions>
          </>
        )}
      </PageHeader>
      <PageContent>{children}</PageContent>
    </PageComponent>
  );
};
