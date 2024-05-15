"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";

export default function UserProfile({ params }) {
  const router = useRouter();
  const [user, setUser] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/user");
    setUser(response.data.data);
  };

  useEffect(() => {
    getUserDetails();
    if (user && user !== "nothing") {
      router.push(`/profile/${user.username}`);
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="text-primary h-full text-center">Redirecting...</div>
    </MainLayout>
  );
}
