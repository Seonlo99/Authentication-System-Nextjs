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

  const password = watch("password");

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
    toast.error("Please ensure all fields are valid");
  };

  const submitHandler = async (user) => {
    try {
      setIsLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Register Successful");
      const response = await axios.post("/api/users/login", user);
      const { username } = response.data;
      router.push(`/profile/${username}`);
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex place-content-center bg-bgLight w-full h-full p-6">
        <div className="flex flex-col align-middle w-2/5 max-w-full h-4/5 bg-bgLight">
          <h1 className="text-center mb-6 font-bold text-2xl text-textLight">
            {isLoading ? "Processing..." : "Sign Up"}
          </h1>
          <div className="flex flex-col bg-primaryLight rounded-lg p-6 text-textLight">
            <form onSubmit={handleSubmit(validHandler, invalidHandler)}>
              <div className="flex flex-col text-textLight">
                <div className="flex flex-col relative pb-6">
                  <label
                    htmlFor="username"
                    className="font-semibold">
                    Username:
                  </label>
                  <input
                    className="placeholder:text-gray-400 rounded-lg mt-1 px-3 py-2 outline-none"
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 4,
                        message: "Username must be at least 4 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "Username can have at most 30 characters",
                      },
                    })}
                  />
                  <p className="text-textLight text-sm absolute bottom-0">
                    {errors.username?.message}
                  </p>
                </div>
                <div className="flex flex-col relative pb-6">
                  <label
                    htmlFor="email"
                    className="font-semibold">
                    Email:
                  </label>
                  <input
                    className="placeholder:text-gray-400 rounded-lg mt-1 px-3 py-2 outline-none"
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
                  <p className="text-textLight text-sm absolute bottom-0">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="flex flex-col relative pb-6">
                  <label
                    htmlFor="password"
                    className="font-semibold">
                    Password:
                  </label>
                  <input
                    className="placeholder:text-gray-400 rounded-lg mt-1 px-3 py-2 outline-none"
                    id="password"
                    type="password"
                    // onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                <div className="flex flex-col relative pb-6">
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
                  className="bg-accentLight text-textLight font-bold text-lg w-5/12 rounded-lg py-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary"
                  type="submit"
                  disabled={isLoading}>
                  Sign up
                </button>
                <div
                  className="bg-secondaryLight text-textLight font-bold text-center text-lg w-5/12 rounded-lg py-2 hover:cursor-pointer"
                  onClick={() => {
                    router.push("/login");
                  }}>
                  Login Here
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
