import React, { useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { observer } from "mobx-react-lite";
import { NavigateFunction, useNavigate } from "react-router-dom";

import TransactionOption from "./TransactionOption";
import { DASHBOARD_ROUTE, TAB_OPTIONS, TRANSACTION_ROUTE } from "../constants";
import { TransactionContext } from "../context/transactionContext";
import ToggleButton from "./ToggleButton";
import userStore from "../store/UserStore";
import {
  ReactElementFunctionType,
  TabOptionsEnum,
  VoidFunctionType,
} from "../types";

const Header: React.FC = observer(() => {
  const path: string = window.location.pathname;
  const { setShowAddTransactionModal } = useContext(TransactionContext)!;
  const navigate: NavigateFunction = useNavigate();

  const renderHeaderName: ReactElementFunctionType = () => {
    switch (path) {
      case DASHBOARD_ROUTE:
        return <p className="font-semibold text-xl">Accounts</p>;

      case TRANSACTION_ROUTE:
        return <p className="font-semibold text-xl">Transactions</p>;
      default:
        return <></>;
    }
  };

  const options: TabOptionsEnum[] = TAB_OPTIONS;

  const renderTabs: ReactElementFunctionType = () => {
    if (path === TRANSACTION_ROUTE) {
      return (
        <ul
          style={{ color: "rgba(113, 142, 191, 1)" }}
          className="hidden md:flex items-center gap-6 text-sm absolute bottom-0 "
        >
          {options.map((option) => (
            <TransactionOption key={option} option={option} />
          ))}
        </ul>
      );
    }
    return <></>;
  };

  const handleShowAddTransactionModal: VoidFunctionType = () => {
    setShowAddTransactionModal(true);
  };

  const renderAddTransactionButton: ReactElementFunctionType = () => {
    return (
      <div className="flex items-center gap-2">
        <ToggleButton />
        <button
          onClick={handleShowAddTransactionModal}
          className="bg-blue-600 dark:bg-slate-700 text-white rounded-lg flex items-center p-1 pr-2"
        >
          <IoIosAdd className="text-xl md:text-2xl" />{" "}
          <span className="text-xs">Add Transaction</span>
        </button>
      </div>
    );
  };

  const handleOpenMenu: VoidFunctionType = () => {
    userStore.toggleMenu();
  };

  const renderHeader: ReactElementFunctionType = () => {
    return (
      <h1
        onClick={handleClickLogo}
        style={{ color: "rgba(248, 154, 35, 1)" }}
        className="font-semibold md:hidden text-base text-center mr-auto ml-4 cursor-pointer"
      >
        Money{" "}
        <span className="" style={{ color: "rgba(2, 150, 156, 1)" }}>
          Matters
        </span>
      </h1>
    );
  };

  const handleClickLogo: VoidFunctionType = () => {
    navigate(DASHBOARD_ROUTE);
  };

  return (
    <header className="min-h-[80px] dark:bg-slate-800 py-4 px-4 border-b-2 relative flex items-center md:block dark:border-b-slate-600">
      <div className="hidden dark:text-slate-200 md:flex items-center justify-between">
        {renderHeaderName()}
        {renderAddTransactionButton()}
      </div>
      {renderTabs()}

      <div className="md:hidden flex items-center justify-between w-full">
        <button onClick={handleOpenMenu}>
          <IoMenu className="text-2xl dark:text-white" />
        </button>

        {renderHeader()}
        {renderAddTransactionButton()}
      </div>
    </header>
  );
});

export default Header;
