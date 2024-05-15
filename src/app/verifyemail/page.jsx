"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import MainLayout from "@/components/MainLayout";
import { verify } from "jsonwebtoken";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const LOADING_MESSAGE = "Verifiying email...";
  const SUCCESS_MESSAGE = "Your email has been successfully verified!";
  const FAIL_MESSAGE =
    "An unknown error has occur, please try to verify your email again.";

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      try {
        verifyUserEmail();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [token]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-y-6">
        <h1 className="text-2xl text-bold text-textLight">
          {isLoading && <p>{LOADING_MESSAGE}</p>}
          {!isLoading && verified && <p>*INSERT SUCCESS PICTURE*</p>}
          {!isLoading && !verified && <p>*INSERT FAIL PICTURE*</p>}
        </h1>
        <div>
          {!isLoading && verified && <p>{SUCCESS_MESSAGE}</p>}
          {!isLoading && !verified && <p>{FAIL_MESSAGE}</p>}
        </div>
      </div>
    </MainLayout>
  );
}
