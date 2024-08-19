import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Providers from "@/lib/providers/Provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickShop Store",
  description: "QuickShop Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className}`}>
          <AppRouterCacheProvider>
            <Toaster />
            <div className="min-h-screen h-full">{children}</div>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
