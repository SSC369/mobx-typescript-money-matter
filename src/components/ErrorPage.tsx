import React from "react";

import error from "../assets/error.jpg";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <img alt="error" className="h-[400px]" src={error} />
      <p className="font-medium text-xl text-slate-600">
        Something went wrong!
      </p>
    </div>
  );
};

export default ErrorPage;
