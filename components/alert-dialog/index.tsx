"use client";

import { useEffect, useState } from "react";
import type { FC, PropsWithChildren, ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface AlertDialogOptions {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  size?: "default" | "sm";
  cancelText?: string;
  confirmText?: string;
  variant?: "default" | "destructive";
}

interface AlertDialogItem {
  id: number;
  options: AlertDialogOptions;
  resolve: (value: boolean) => void;
}

type AlertDialogState = {
  queue: AlertDialogItem[];
  current: AlertDialogItem | null;
};

type Listener = (state: AlertDialogState) => void;

const listeners: Set<Listener> = new Set();

let state: AlertDialogState = {
  queue: [],
  current: null,
};

let idCounter = 0;

const notify = () => {
  for (const listener of listeners) {
    listener(state);
  }
};

const processQueue = () => {
  if (state.current === null && state.queue.length > 0) {
    const [next, ...rest] = state.queue;
    state = {
      queue: rest,
      current: next,
    };
    notify();
  }
};

const addToQueue = (item: AlertDialogItem) => {
  state = {
    ...state,
    queue: [...state.queue, item],
  };
  processQueue();
};

const closeCurrent = (result: boolean) => {
  if (state.current) {
    state.current.resolve(result);
    state = {
      ...state,
      current: null,
    };
    notify();
    // Process next item in queue after a small delay for animation
    setTimeout(processQueue, 150);
  }
};

export const alertDialog = (options: AlertDialogOptions): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const item: AlertDialogItem = {
      id: idCounter++,
      options,
      resolve,
    };
    addToQueue(item);
  });
};

export type AlertDialogProviderProps = PropsWithChildren;

export const AlertDialogProvider: FC<AlertDialogProviderProps> = ({
  children,
}) => {
  const [localState, setLocalState] = useState<AlertDialogState>(state);

  useEffect(() => {
    listeners.add(setLocalState);
    return () => {
      listeners.delete(setLocalState);
    };
  }, []);

  const handleAction = () => {
    closeCurrent(true);
  };

  const handleCancel = () => {
    closeCurrent(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && localState.current) {
      closeCurrent(false);
    }
  };

  const current = localState.current;

  return (
    <>
      {children}
      <AlertDialog open={current !== null} onOpenChange={handleOpenChange}>
        <AlertDialogContent size={current?.options.size}>
          <AlertDialogHeader>
            {current?.options.icon && (
              <AlertDialogMedia
                className={cn(
                  current?.options.variant === "destructive" &&
                    "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
                )}
              >
                {current.options.icon}
              </AlertDialogMedia>
            )}
            <AlertDialogTitle>{current?.options.title}</AlertDialogTitle>
            {current?.options.description && (
              <AlertDialogDescription>
                {current.options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {current?.options.cancelText ?? "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              variant={current?.options.variant}
              onClick={handleAction}
            >
              {current?.options.confirmText ?? "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
