"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="container bg-bgLight mx-auto max-w-full flex justify-between px-6 py-4 items-center border-b-2 border-primaryLight">
      <div>
        <div
          onClick={() => router.push("/")}
          className="hover:cursor-pointer text-primaryLight">
          LOGO HERE
        </div>
      </div>
      <div className="right-0 flex justify-center gap-x-5 items-center text-primaryLight font-semibold">
        <button
          className="border-b-2 border-primaryLight/0 hover:border-primaryLight/100 transition-all duration-500"
          onClick={() => router.push("/signup")}>
          Signup
        </button>
        <button
          className="border-b-2 border-primaryLight/0 hover:border-primaryLight/100 transition-all duration-1000"
          onClick={() => router.push("/login")}>
          Login
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-full font-semibold bg-secondaryLight text-textLight transition-all duration-300">
          Button
        </button>
      </div>
    </header>
  );
};

export default Header;
