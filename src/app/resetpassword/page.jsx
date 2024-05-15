"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/MainLayout";

export default function SignupPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const SUCCESS_MESSAGE = "Password has been changed";
  const FAIL_MESSAGE = "An unknown error has occured";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      newPassword: "",
      cfmPassword: "",
    },
  });

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const password = watch("password");

  const validHandler = (data) => {
    const { newPassword } = data;

    const user = {
      token: token,
      newPassword: newPassword,
    };

    submitHandler(user);
  };

  const invalidHandler = (data) => {
    toast.error("Please ensure new password meet requirements");
  };

  const submitHandler = async (user) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/resetpassword", user);
      toast.success(SUCCESS_MESSAGE);
      router.push("/login");
    } catch (error) {
      toast.error(FAIL_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(errors);

  return (
    <MainLayout>
      <div className="flex place-content-center bg-bgLight w-full h-full">
        <div className="flex flex-col align-middle w-2/5 max-w-full h-4/5 bg-bgLight">
          {isLoading && (
            <h1 className="text-center text-primary">Processing...</h1>
          )}
          <h1 className="text-center mb-6 font-bold text-2xl text-textLight">
            Reset Password
          </h1>
          <div className="flex flex-col bg-primaryLight rounded-lg p-6 text-textLight">
            <form onSubmit={handleSubmit(validHandler, invalidHandler)}>
              <div className="flex flex-col text-textLight">
                <div className="flex flex-col relative pb-6">
                  <label
                    htmlFor="newPassword"
                    className="font-semibold">
                    New Password:
                  </label>
                  <input
                    className="placeholder:text-gray-400 rounded-lg mt-1 px-3 py-2 outline-none"
                    id="newPassword"
                    type="password"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <p className="text-textLight text-sm absolute bottom-0">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="flex flex-col relative pb-6 mt-2">
                  <label
                    htmlFor="cfmPassword"
                    className="font-semibold">
                    Confirm Password:
                  </label>
                  <input
                    className="placeholder:text-gray-400 rounded-lg mt-1 px-3 py-2 outline-none"
                    id="cfmPassworod"
                    type="password"
                    placeholder="Enter password again"
                    {...register("cfmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) => {
                        if (value !== password) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                  />
                  <p className="text-textLight text-sm absolute bottom-0">
                    {errors.cfmPassword?.message}
                  </p>
                </div>
              </div>
              <div className="flex justify-around mt-2 mb-4">
                <button
                  className="bg-accentLight text-textLight font-bold text-lg w-full rounded-lg py-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary"
                  type="submit"
                  disabled={isLoading}>
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
