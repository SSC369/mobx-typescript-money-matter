import React from "react";
import empty from "../assets/empty.jpg";

const EmptyView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[60dvh]">
      <img src={empty} className="h-[300px] rounded-xl" alt="empty" />
      <h1
        style={{ color: "rgb(113, 142, 191)" }}
        className="font-medium text-xl"
      >
        No Transactions Found
      </h1>
    </div>
  );
};

export default EmptyView;
