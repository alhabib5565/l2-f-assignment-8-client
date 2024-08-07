"use client";
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    return router.push("/login");
  }
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default Layout;
