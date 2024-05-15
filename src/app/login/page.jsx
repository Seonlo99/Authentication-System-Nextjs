"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/MainLayout";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const ERROR_MESSAGE = "Invalid Email or Password";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cfmPassword: "",
    },
  });

  const validHandler = (data) => {
    const { username, email, password } = data;

    const user = {
      username: username,
      email: email,
      password: password,
    };

    submitHandler(user);
  };

  const invalidHandler = (data) => {
    toast.error(ERROR_MESSAGE);
  };

  const submitHandler = async (user) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      const { username } = response.data;
      router.push(`/profile/${username}`);
    } catch (error) {
      toast.error(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex place-content-center bg-bgLight">
        <div className="flex flex-col align-middle w-2/5 max-w-full h-4/5">
          {isLoading && (
            <h1 className="text-center text-primary">Processing...</h1>
          )}
          <h1 className="text-center mb-6 font-bold text-3xl text-textLight">
            Login
          </h1>
          <div className="flex flex-col bg-primaryLight rounded-lg p-6 text-textLight">
            <form onSubmit={handleSubmit(validHandler, invalidHandler)}>
              <div className="flex flex-col text-textLight">
                <label
                  htmlFor="email"
                  className="font-semibold text-base">
                  Email:
                </label>
                <input
                  className="placeholder:text-gray-400 rounded-lg px-2 py-2 outline-none"
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
                <label
                  htmlFor="password"
                  className="font-semibold text-base mt-4">
                  Password:
                </label>
                <input
                  className="placeholder:text-gray-400 rounded-lg px-2 py-2 outline-none"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password has minimum 6 characters",
                    },
                  })}
                />
                <p
                  className="text-sm text-textLight p-1 text-right hover:underline hover:cursor-pointer underline-offset-4"
                  onClick={() => router.push("/forgotpassword")}>
                  Forgot Password?
                </p>
              </div>
              <div className="flex flex-col justify-around mt-2 gap-y-4">
                <button
                  className="bg-accentLight text-textLight font-bold text-lg rounded-lg py-2"
                  type="submit"
                  disabled={isLoading}>
                  Login
                </button>
                <div
                  className="bg-secondaryLight text-textLight font-bold text-center text-lg rounded-lg py-2 hover:cursor-pointer"
                  onClick={() => router.push("/signup")}>
                  Signup Here
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
