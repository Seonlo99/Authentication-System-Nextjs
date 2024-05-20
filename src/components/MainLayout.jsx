import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }) => {
  return (
    <section className="flex flex-col mx-auto min-h-screen">
      <Toaster />
      <Header />
      <div className="flex flex-1 bg-white min-h-full w-full">{children}</div>
      <Footer />
    </section>
  );
};

export default MainLayout;
