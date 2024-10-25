import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import { TransactionContext } from "../context/transactionContext";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import { API_DELETE_TRANSACTION, SUCCESS_OK } from "../constants";
import ErrorPage from "../components/ErrorPage";
import TotalDebitCredit from "./TotalDebitCredit";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import { observer } from "mobx-react-lite";
import userStore from "../store/UserStore";
import transactionStore from "../store/TransactionStore";
import {
  ReactElementFunctionType,
  TransactionType,
  VoidPromiseFunctionType,
} from "../types";

const Dashboard: React.FC = observer(() => {
  const {
    isTransactionsLoading,
    deleteTransactionId,
    setDeleteTransactionId,
    showEditTransactionModal,
    setShowEditTransactionModal,
    transactionsError,
  } = useContext(TransactionContext)!;

  const [editTransactionId, setEditTransactionId] = useState<number | null>(
    null
  );
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const { userId } = userStore.userContextData!;
  const latestTransactions = transactionStore.getLatestTransactions;

  const handleTransactionDeleteSuccess: (data: { id: number }) => void = (
    data
  ) => {
    toast.success("Transaction deleted");
    transactionStore.deleteTransaction(data);
  };

  const handleTransactionDelete: VoidPromiseFunctionType = async () => {
    try {
      setIsDeleteLoading(true);
      const url: string = API_DELETE_TRANSACTION + deleteTransactionId;
      //ask type for res
      const res = await axios.delete(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === SUCCESS_OK) {
        handleTransactionDeleteSuccess(res.data.delete_transactions_by_pk);
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setDeleteTransactionId(null);
      setIsDeleteLoading(false);
      setTimeout(() => {
        setShowAlertModal(false);
      }, 1000);
    }
  };

  const getTransactionsData: () => React.ReactNode[] = () => {
    const transactionsData: React.ReactElement[] = latestTransactions?.map(
      ({ transaction_name, id, category, amount, date, type }) => {
        return (
          <TransactionItem
            key={id}
            data={{
              transaction_name,
              id,
              category,
              amount,
              date,
              type,
            }}
            setEditTransactionId={setEditTransactionId}
            setShowEditTransactionModal={setShowEditTransactionModal}
            setShowAlertModal={setShowAlertModal}
            setDeleteTransactionId={setDeleteTransactionId}
          />
        );
      }
    );

    return transactionsData;
  };

  const renderAlertModal: ReactElementFunctionType = () => {
    if (showAlertModal) {
      return (
        <ConfirmModal
          onClose={() => setShowAlertModal(false)}
          isLoading={isDeleteLoading}
          action={"delete"}
          actionHandler={() => handleTransactionDelete()}
        />
      );
    }
    return <></>;
  };

  const getEditTransaction: () => TransactionType | undefined = () => {
    let transactionData: TransactionType | undefined;
    if (editTransactionId) {
      transactionData = latestTransactions.find(
        (transaction) => transaction.id === editTransactionId
      );
    }
    return transactionData;
  };

  const renderEditTransactionModal: ReactElementFunctionType = () => {
    if (showEditTransactionModal) {
      const data = getEditTransaction()!;
      return (
        <EditTransactionModal
          onClose={() => {
            setShowEditTransactionModal(false);
            setEditTransactionId(null);
          }}
          data={data}
        />
      );
    }
    return <></>;
  };

  const renderLatestTransactions: () => React.ReactElement = () => {
    if (isTransactionsLoading) {
      return (
        <div className="flex items-center justify-center h-[60dvh]">
          <Loader />
        </div>
      );
    } else {
      if (latestTransactions?.length === 0) {
        return <EmptyView />;
      } else {
        return (
          <ul className="flex gap-2 md:gap-0 md:flex-col flex-wrap  md:dark:bg-slate-700 md:bg-white rounded-xl p-2 px-4 mt-2">
            {getTransactionsData().map((t) => t)}
          </ul>
        );
      }
    }
  };

  if (transactionsError) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-dh w-full p-4 dark:bg-slate-800 bg-slate-100">
      <h1 className="font-semibold text-xl text-center mb-4 dark:text-slate-200 text-slate-700 md:hidden">
        Accounts
      </h1>
      <TotalDebitCredit />
      <h1 className="font-semibold mt-4 text-center md:text-left text-xl dark:text-slate-200">
        Last Transactions
      </h1>

      {renderLatestTransactions()}
      {renderAlertModal()}
      {renderEditTransactionModal()}
    </div>
  );
});

export default Dashboard;
