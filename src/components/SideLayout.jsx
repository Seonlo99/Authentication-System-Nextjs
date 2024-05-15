import Header from "./Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const SideLayout = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto min-h-screen">
      <Toaster />
      <Header />
      <div className="bg-bgLight h-full w-full mt-[73.6px]">{children}</div>
    </div>
  );
};

export default SideLayout;
