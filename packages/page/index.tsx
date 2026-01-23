import { EllipsisVertical } from "lucide-react";
import { Button } from "@repo/button";
import type { ComponentProps, FC, Key, ReactElement, ReactNode } from "react";
import {
  PageAction,
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

export type PageActionProps = {
  key?: Key;
  disabled?: boolean;
  content: ReactNode;
  onAction?: () => void;
  render?: ReactElement;
};

export type PageProps = ComponentProps<typeof PageComponent> & {
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: PageActionProps;
  secondaryActions?: Array<PageActionProps>;
};

export const Page: FC<PageProps> = ({
  children,
  title,
  description,
  primaryAction,
  secondaryActions,
  ...props
}) => {
  return (
    <PageComponent {...props}>
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        {description && <PageDescription>{description}</PageDescription>}

        {(primaryAction ||
          (secondaryActions && secondaryActions?.length > 0)) && (
          <>
            {/* Desktop */}
            <PageAction className="hidden @md/page:flex">
              <div className="flex gap-2">
                {secondaryActions?.map((action, index) => (
                  <Button
                    key={action.key ?? index}
                    disabled={action.disabled}
                    render={action.render}
                    variant="secondary"
                    onClick={action.onAction}
                  >
                    {action.content}
                  </Button>
                ))}

                {primaryAction && (
                  <Button
                    key={primaryAction.key}
                    disabled={primaryAction.disabled}
                    render={primaryAction.render}
                    onClick={primaryAction.onAction}
                  >
                    {primaryAction.content}
                  </Button>
                )}
              </div>
            </PageAction>

            {/* Mobile */}
            <PageAction className="flex @md/page:hidden">
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
                      key={primaryAction.key}
                      disabled={primaryAction.disabled}
                      render={primaryAction.render}
                      onClick={primaryAction.onAction}
                    >
                      {primaryAction.content}
                    </DropdownMenuItem>
                  )}

                  {secondaryActions?.map((action, index) => (
                    <DropdownMenuItem
                      key={action.key ?? index}
                      disabled={action.disabled}
                      render={action.render}
                      onClick={action.onAction}
                    >
                      {action.content}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </PageAction>
          </>
        )}
      </PageHeader>
      <PageContent>{children}</PageContent>
    </PageComponent>
  );
};
