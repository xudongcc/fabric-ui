import "./global.css";

import { RootProvider } from "fumadocs-ui/provider/next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { AlertDialogProvider } from "@/components/fabric-ui/alert-dialog";
import { ToastProvider } from "@/components/fabric-ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning className={inter.variable} lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <RootProvider>
          <AlertDialogProvider>
            <ToastProvider>{children}</ToastProvider>
          </AlertDialogProvider>
        </RootProvider>
      </body>
    </html>
  );
}
