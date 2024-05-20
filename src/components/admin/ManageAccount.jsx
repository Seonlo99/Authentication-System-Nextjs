import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const response = await axios.get("/api/admin/viewaccount");
        const { usersData } = response.data;
        setUsersData(usersData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAccountData();
  }, []);

  return isLoading ? (
    "Loading..."
  ) : (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row border-b-2 border-primaryLight gap-x-2">
        <div className="w-[20%]">Username</div>
        <div className="w-[40%]">Email</div>
        <div className="w-[10%] text-center">Role</div>
        <div className="w-[10%] text-center">Verified</div>
        <div className="w-[20%] text-center">Change role to</div>
      </div>
      {usersData.map((userData) => {
        return (
          <div className="flex flex-row gap-x-2 items-center">
            <div className="w-[20%] align-middle">{userData.username}</div>
            <div className="w-[40%]">{userData.email}</div>
            <div className="w-[10%] text-center">{userData.role}</div>
            <div className="w-[10%] text-center">
              {userData.isVerified ? "Yes" : "No"}
            </div>
            <div className="w-[20%] flex justify-center">
              <button className="bg-secondaryLight rounded-full w-4/5 p-2">
                {userData.role === "User" ? "Manager" : "User"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManageAccount;
