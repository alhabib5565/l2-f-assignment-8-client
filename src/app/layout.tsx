import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import MyProvider from "@/lib/providers/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ceaning Supplies Store",
  description: "Ceaning Supplies Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <AppRouterCacheProvider>
            <div className="min-h-screen h-full">{children}</div>
          </AppRouterCacheProvider>
        </body>
      </html>
    </MyProvider>
  );
}
