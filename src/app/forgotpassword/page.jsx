"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/MainLayout";

export default function SignupPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const SUCCESS_MESSAGE = "Reset Email has been sent";
  const FAIL_MESSAGE = "An unknown error has occur";
  const INVALID_EMAIL_MESSAGE = "Invalid Email";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const validHandler = (data) => {
    const { email } = data;
    const user = {
      email: email,
    };
    submitHandler(user);
  };

  const invalidHandler = (data) => {
    toast.error(INVALID_EMAIL_MESSAGE);
  };

  const submitHandler = async (user) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      toast.success(SUCCESS_MESSAGE);
    } catch (error) {
      toast.error(FAIL_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 items-center bg-bgLight p-6">
        <h1 className="text-center mb-6 font-bold text-3xl text-textLight">
          {isLoading ? "Processing..." : "Forgot Password"}
        </h1>
        <div className="flex flex-col w-2/5 bg-primaryLight rounded-lg p-6 text-textLight">
          <form onSubmit={handleSubmit(validHandler, invalidHandler)}>
            <div className="flex flex-col text-textLight">
              <label
                htmlFor="email"
                className="font-semibold text-base">
                Email:
              </label>
              <input
                className="placeholder:text-gray-400 rounded-lg px-2 py-2 mt-1 outline-none"
                id="email"
                type="text"
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            <div className="flex flex-col justify-around mt-8 gap-y-4">
              <button
                className="bg-accentLight text-textLight font-bold text-lg rounded-lg py-2"
                type="submit"
                disabled={isLoading}>
                Send Reset Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
