"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import { MESSAGES } from "@/constants/messages";

export default function UserProfile({ params }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleClick = (select) => {
    setSelected(select);
  };

  const request = async (selection) => {
    const response = await axios.post("/api/users/", selection);
  };

  useEffect(() => {
    try {
      console.log(selected);
    } catch (error) {
      toast.error(MESSAGES.UNKNOWN_ERROR_MESSAGE);
    }
  }, [selected]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/");
    } catch (error) {
      toast.error(MESSAGES.UNKNOWN_ERROR_MESSAGE);
    }
  };

  useEffect(() => {}, []);

  return (
    <MainLayout>
      <div className="flex-1 flex py-2">
        <div className="flex flex-col flex-1 min-w-fit gap-y-8 border-r-2 border-primaryLight px-6">
          <div className="flex flex-col">
            <h1 className="text-textLight font-bold">Welcome "username",</h1>
          </div>
          <div className="flex flex-1 flex-col gap-y-4">
            <button
              onClick={() => handleClick("Tab 1")}
              className="text-textLight text-left hover:underline">
              Tab 1
            </button>
            <button
              onClick={() => handleClick("Tab 2")}
              className="text-textLight text-left hover:underline">
              Tab 2
            </button>
            <button
              onClick={() => handleClick("Tab 3")}
              className="text-textLight text-left hover:underline">
              Tab 3
            </button>
          </div>
          <div className="bottom-0">
            <button
              className="px-6 py-2 w-full rounded-full font-semibold bg-bgLight text-textLight border-red-500 border-2 hover:bg-red-500 hover:text-white transition-all duration-300"
              onClick={() => logout()}>
              Sign out
            </button>
          </div>
        </div>
        <div className="w-5/6 p-6">
          <div>Content</div>
        </div>
      </div>
    </MainLayout>
  );
}
