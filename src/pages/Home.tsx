import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContext } from "../context/transactionContext";
import AddTransactionModal from "../components/AddTransactionModal";
import themeStore from "../store/ThemeStore";
import { ReactElementFunctionType } from "../types";
import { DARK_MODE_KEY } from "../constants";

const Home: React.FC = observer(() => {
  const { showAddTransactionModal, setShowAddTransactionModal } =
    useContext(TransactionContext)!;

  const renderAddTransactionModal: ReactElementFunctionType = () => {
    if (showAddTransactionModal) {
      return (
        <AddTransactionModal
          onClose={() => setShowAddTransactionModal(false)}
        />
      );
    }
    return <></>;
  };

  return (
    <div
      className={`relative ${
        themeStore.getTheme === DARK_MODE_KEY ? "dark" : ""
      }`}
    >
      <Sidebar />
      <div className="md:ml-[200px] ">
        <Header />
        <Outlet />
      </div>
      {renderAddTransactionModal()}
    </div>
  );
});

export default Home;
