import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import {
  API_ALL_TRANSACTIONS,
  API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
  INITIAL_ACTIVE_TAB,
  SUCCESS_OK,
  TRANSACTIONS_LIMIT,
  TRANSACTIONS_OFFSET,
} from "../constants";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import userStore from "../store/UserStore";
import transactionStore from "../store/TransactionStore";
import {
  CreditAndDebitTotalType,
  TransactionContextProviderPropsType,
  TransactionContextType,
  TransactionType,
} from "../types";

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

export const TransactionContextProvider: React.FC<
  TransactionContextProviderPropsType
> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>(INITIAL_ACTIVE_TAB);
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState<boolean>(false);
  const [showAddTransactionModal, setShowAddTransactionModal] =
    useState<boolean>(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(
    null
  );
  const userId: number = userStore.userContextData!.userId;
  console.log(userStore.userContextData);
  if (!userId) {
    return <></>;
  }

  const transactionsFetcher: (
    url: string
  ) => Promise<TransactionType[]> = async (url) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: TRANSACTIONS_LIMIT,
          offset: TRANSACTIONS_OFFSET,
        },
        headers: TRANSACTION_HEADERS(userId),
      });
      if (res.status === SUCCESS_OK) {
        const { data } = res;
        const { transactions } = data;
        return transactions;
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useSWR(API_ALL_TRANSACTIONS, transactionsFetcher);

  useEffect(() => {
    if (!isTransactionsLoading) {
      if (transactions) {
        transactionStore.setTransactions(transactions);
      }
    }
  }, [isTransactionsLoading]);

  const totalDebitCreditTransactionsFetcher: (
    url: string
  ) => Promise<CreditAndDebitTotalType> = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          ...TRANSACTION_HEADERS(userId),
        },
      });
      if (res.status === SUCCESS_OK) {
        const { data } = res;
        const { totals_credit_debit_transactions } = data;
        return totals_credit_debit_transactions;
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const {
    data: totalDebitCreditTransactionsData,
    isLoading: isTotalDebitCreditTransactionsLoading,
    error: totalDebitCreditTransactionsError,
  } = useSWR(
    API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
    totalDebitCreditTransactionsFetcher
  );

  useEffect(() => {
    if (!isTotalDebitCreditTransactionsLoading) {
      if (totalDebitCreditTransactionsData) {
        transactionStore.setTotalDebitCreditTransactionsData(
          totalDebitCreditTransactionsData
        );
      }
    }
  }, [isTotalDebitCreditTransactionsLoading]);

  return (
    <TransactionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isTransactionsLoading,
        isTotalDebitCreditTransactionsLoading,
        showEditTransactionModal,
        setShowEditTransactionModal,
        deleteTransactionId,
        setDeleteTransactionId,
        transactionsError,
        totalDebitCreditTransactionsError,
        showAddTransactionModal,
        setShowAddTransactionModal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};