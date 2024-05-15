import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto min-h-screen">
      <Toaster />
      <Header />
      <div className="bg-bgLight h-full w-full mt-[73.6px] p-6">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
