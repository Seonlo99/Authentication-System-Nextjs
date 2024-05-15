"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function UserProfile({ params }) {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <MainLayout>
      <div className="h-full">
        <h1>Hello {params.id}</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </MainLayout>
  );
}
