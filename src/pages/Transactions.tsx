import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import { TransactionContext } from "../context/transactionContext";
import ConfirmModal from "../components/ConfirmModal";
import EditTransactionModal from "../components/EditTransactionModal";
import TransactionItem from "../components/TransactionItem";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import {
  ACTION_TYPES,
  API_DELETE_TRANSACTION,
  SUCCESS_OK,
  TAB_OPTIONS,
} from "../constants";
import ErrorPage from "../components/ErrorPage";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import TransactionOption from "../components/TransactionOption";
import { observer } from "mobx-react-lite";
import userStore from "../store/UserStore";
import transactionStore from "../store/TransactionStore";
import {
  ReactElementFunctionType,
  TabOptionsEnum,
  VoidPromiseFunctionType,
} from "../types";
import TransactionModel from "../store/TransactionModel";

const Transactions: React.FC = observer(() => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const {
    activeTab,
    isTransactionsLoading,
    deleteTransactionId,
    setDeleteTransactionId,
    showEditTransactionModal,
    setShowEditTransactionModal,
    transactionsError,
  } = useContext(TransactionContext)!;

  const transactions = transactionStore.getTransactions;
  const [editTransactionId, setEditTransactionId] = useState<number | null>(
    null
  );
  const { userId } = userStore.userContextData!;

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
      const res = await axios.delete(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === SUCCESS_OK) {
        handleTransactionDeleteSuccess(res.data.delete_transactions_by_pk);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsDeleteLoading(false);
      setDeleteTransactionId(null);
      setTimeout(() => {
        setShowAlertModal(false);
      }, 1000);
    }
  };

  const renderAllTransactionTypes: () =>
    | React.ReactElement
    | React.ReactNode[] = () => {
    if (transactions.length === 0 || !transactions) {
      return <EmptyView />;
    }
    const data: React.ReactElement[] = transactions?.map(
      ({ transactionName, id, category, amount, date, type }) => {
        return (
          <TransactionItem
            key={v4()}
            data={{
              transactionName,
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

    return data;
  };

  const renderCreditTransactions: () =>
    | React.ReactElement
    | React.ReactNode[] = () => {
    let filteredData: React.ReactElement[] = [];
    transactions?.forEach((data) => {
      if (data.type === TabOptionsEnum.CREDIT) {
        filteredData.push(
          <TransactionItem
            key={v4()}
            data={{
              ...data,
            }}
            setEditTransactionId={setEditTransactionId}
            setShowEditTransactionModal={setShowEditTransactionModal}
            setShowAlertModal={setShowAlertModal}
            setDeleteTransactionId={setDeleteTransactionId}
          />
        );
      }
    });

    if (filteredData.length === 0) {
      return <EmptyView />;
    }
    return filteredData;
  };

  const renderDebitTransactions: () =>
    | React.ReactElement
    | React.ReactNode[] = () => {
    let filteredData: React.ReactElement[] = [];
    transactions?.forEach((data) => {
      if (data.type === TabOptionsEnum.DEBIT) {
        filteredData.push(
          <TransactionItem
            key={v4()}
            data={{
              ...data,
            }}
            setEditTransactionId={setEditTransactionId}
            setShowEditTransactionModal={setShowEditTransactionModal}
            setShowAlertModal={setShowAlertModal}
            setDeleteTransactionId={setDeleteTransactionId}
          />
        );
      }
    });

    if (filteredData.length === 0) {
      return <EmptyView />;
    }
    return filteredData;
  };

  const renderTransactionDataByTab: () =>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode[]
    | undefined = () => {
    switch (true) {
      case activeTab === TabOptionsEnum.TRANSACTIONS:
        return renderAllTransactionTypes();
      case activeTab === TabOptionsEnum.CREDIT:
        return renderCreditTransactions();
      case activeTab === TabOptionsEnum.DEBIT:
        return renderDebitTransactions();
      default:
        break;
    }
  };

  const RenderTransactions: ReactElementFunctionType = () => {
    if (isTransactionsLoading) {
      return (
        <div className="flex items-center justify-center h-[60dvh]">
          <Loader />
        </div>
      );
    } else {
      if (transactions?.length === 0) {
        return <EmptyView />;
      } else {
        return (
          <ul className="flex gap-2 md:gap-0 md:flex-col flex-wrap  md:dark:bg-slate-700 md:bg-white rounded-xl p-2 px-4 mt-2">
            {renderTransactionDataByTab()}
          </ul>
        );
      }
    }
  };

  const renderConfirmModal: ReactElementFunctionType = () => {
    if (showAlertModal) {
      return (
        <ConfirmModal
          onClose={() => setShowAlertModal(false)}
          isLoading={isDeleteLoading}
          action={ACTION_TYPES.delete}
          actionHandler={() => handleTransactionDelete()}
        />
      );
    }
    return <></>;
  };

  const getTransaction: () => TransactionModel | undefined = () => {
    let transactionData: TransactionModel | undefined;
    if (editTransactionId) {
      transactionData = transactions.find(
        (transaction) => transaction.id === editTransactionId
      );
    }
    return transactionData;
  };

  const renderEditTransactionModal: ReactElementFunctionType = () => {
    if (showEditTransactionModal) {
      const data = getTransaction()!;
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

  const renderTransactionTabs: ReactElementFunctionType = () => {
    const options: TabOptionsEnum[] = TAB_OPTIONS;
    return (
      <ul
        style={{ color: "rgba(113, 142, 191, 1)" }}
        className="flex md:hidden items-center gap-6 text-sm mx-auto w-fit mb-6"
      >
        {options.map((option) => (
          <TransactionOption key={option} option={option} />
        ))}
      </ul>
    );
  };

  if (transactionsError) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-dh w-full p-4 bg-slate-100 dark:bg-slate-800">
      <h1 className="md:hidden text-xl dark:text-slate-200 font-semibold text-center mb-4">
        Transactions
      </h1>
      {renderTransactionTabs()}
      {RenderTransactions()}
      {renderEditTransactionModal()}
      {renderConfirmModal()}
    </div>
  );
});

export default Transactions;
