"use client";
import React, { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default Layout;
