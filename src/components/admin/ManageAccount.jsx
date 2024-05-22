import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState(null);

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

  useEffect(() => {
    getAccountData();
  }, []);

  const handleChangeRole = async (roleChangeRequest) => {
    try {
      await axios.post("/api/admin/changerole", roleChangeRequest);
      toast.success(`Role has changed to ${roleChangeRequest.newRole}`);
      getAccountData();
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <div
            key={userData._id}
            className="flex flex-row gap-x-2 items-center">
            <div className="w-[20%] align-middle">{userData.username}</div>
            <div className="w-[40%]">{userData.email}</div>
            <div className="w-[10%] text-center">{userData.role}</div>
            <div className="w-[10%] text-center">
              {userData.isVerified ? "Yes" : "No"}
            </div>
            <div className="w-[20%] flex justify-center">
              <button
                onClick={() => {
                  const roleChangeRequest = {
                    username: userData.username,
                    email: userData.email,
                    newRole: userData.role === "User" ? "Manager" : "User",
                  };
                  handleChangeRole(roleChangeRequest);
                }}
                className="bg-secondaryLight rounded-full w-4/5 p-2">
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
