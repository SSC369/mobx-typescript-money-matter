import React from "react";
import { InputElementPropsType, SelectInputPropsType } from "../types";

export const InputLabel: React.FC<{ name: string }> = ({ name }) => (
  <label className="text-sm font-medium dark:text-slate-300 text-slate-600">
    {name}
  </label>
);

export const SelectInput: React.FC<SelectInputPropsType> = (props) => {
  return (
    <select
      className="border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full"
      {...props}
    >
      {props.children}
    </select>
  );
};

export const InputElement: React.FC<InputElementPropsType> = (props) => {
  const isName: string =
    props.name === "name" ? "Transaction Name" : props.name;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium dark:text-slate-300 text-slate-600 first-letter:capitalize">
        {isName}
      </label>
      <input
        className="border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
        {...props}
      />
    </div>
  );
};
