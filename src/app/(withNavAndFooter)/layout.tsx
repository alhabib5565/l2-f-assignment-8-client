import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen h-full">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
