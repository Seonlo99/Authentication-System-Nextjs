import React from "react";

const Footer = () => {
  return (
    <footer className="bg-bgLight dark:bg-gray-900 border-t-2 border-primaryLight mt-auto">
      <div className="mx-auto w-full max-w-screen-2xl p-4">
        <div className="flex justify-around">
          <div className="text-textLight">
            <h1>Company Name</h1>
            <p>Conact Number</p>
            <p>Email</p>
            <p>Address</p>
            <p>Additional Infomation</p>
          </div>

          <div className="text-textLight">
            <p>*ADDITIONAL ITEMS*</p>
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-textLight">
            © 2024 Company Name. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
