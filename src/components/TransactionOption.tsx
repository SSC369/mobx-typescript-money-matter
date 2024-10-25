import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { TransactionContext } from "../context/transactionContext";
import {
  ReactElementFunctionType,
  TabOptionsEnum,
  TransactionOptionPropsType,
} from "../types";
import { useTranslation } from "react-i18next";

const TransactionOption: React.FC<TransactionOptionPropsType> = observer(
  ({ option }) => {
    const { setActiveTab, activeTab } = useContext(TransactionContext)!;
    const isActiveTab: boolean = option === activeTab;

    const { t } = useTranslation();

    const renderPointer: ReactElementFunctionType = () => {
      if (isActiveTab) {
        return (
          <div
            className={`tab h-1 transition-colors w-full rounded-t-md bg-blue-500 absolute bottom-0 `}
          ></div>
        );
      }
      return <></>;
    };

    return (
      <li
        style={isActiveTab ? { color: "rgba(45, 96, 255, 1)" } : {}}
        className="w-fit relative dark:text-slate-200 cursor-pointer"
        onClick={() => {
          setActiveTab(option);
        }}
      >
        <p className="pb-2 first-letter:capitalize">
          <span className="">{t(`header.headerTabs.${option}`)}</span>
        </p>
        {renderPointer()}
      </li>
    );
  }
);

export default TransactionOption;
