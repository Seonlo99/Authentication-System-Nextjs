"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import ManageAccount from "@/components/admin/ManageAccount";
import { MESSAGES } from "@/constants/messages";

export default function UserProfile({ params }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const VIEW_ACCOUNT = "view";

  const handleClick = (select) => {
    setSelected(select);
  };

  useEffect(() => {
    const authenticateAdmin = async () => {
      try {
        const response = await axios.get("api/admin/verifyadmin");
        setIsAdmin(true);
        console.log("authenticated");
      } catch (error) {
        toast.error(MESSAGES.UNKNOWN_ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    };
    authenticateAdmin();
  }, []);

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

  return isLoading ? (
    "Processing"
  ) : !isAdmin ? (
    "ACCESS DENIED"
  ) : (
    <MainLayout>
      <div className="flex-1 flex py-2">
        <div className="flex flex-col flex-1 min-w-fit gap-y-8 border-r-2 border-primaryLight px-6">
          <div className="flex flex-col">
            <h1 className="text-textLight font-bold">Welcome Admin,</h1>
          </div>
          <div className="flex flex-1 flex-col gap-y-4">
            <button
              onClick={() => handleClick(VIEW_ACCOUNT)}
              className="text-textLight text-left hover:underline">
              Manage Account
            </button>
            <button
              onClick={() => handleClick("Tab 2")}
              className="text-textLight text-left hover:underline">
              Tab 2
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
        <div className="w-5/6 px-6">
          <ManageAccount />
        </div>
      </div>
    </MainLayout>
  );
}
