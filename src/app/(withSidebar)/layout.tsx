import DashboardLayout from "@/components/dashboard/DashboardLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default layout;
