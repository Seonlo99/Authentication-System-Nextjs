"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "@/components/MainLayout";

export default function UserProfile() {
  const router = useRouter();

  const clearToken = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      toast.error(MESSAGES.UNKNOWN_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/user");
        const user = response.data.user;
        router.replace(`/profile/${user.username}`);
      } catch (error) {
        console.error(error.message);
        clearToken();
      }
    };
    getUserDetails();
  }, []);

  return (
    <MainLayout>
      <div className="text-primary h-full text-center p-6">Redirecting...</div>
    </MainLayout>
  );
}
