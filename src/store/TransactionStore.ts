import { makeAutoObservable } from "mobx";
import { NUMBER_OF_TRANSACTIONS } from "../constants";
import { CreditAndDebitTotalType, TransactionType } from "../types";

class TransactionStore {
  totalDebitCreditTransactionsData: CreditAndDebitTotalType = [];
  transactions: TransactionType[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get getTransactions(): TransactionType[] {
    return this.transactions;
  }
  get getTotalDebitCreditTransactionsData(): CreditAndDebitTotalType {
    return this.totalDebitCreditTransactionsData;
  }
  setTransactions(data: TransactionType[]): void {
    this.transactions = data;
  }
  setTotalDebitCreditTransactionsData(data: CreditAndDebitTotalType): void {
    this.totalDebitCreditTransactionsData = data;
  }

  addAmountTotalDebitCreditData(
    transaction: TransactionType,
    prev: number
  ): void {
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === transaction.type) {
          return {
            type: transaction.type,
            sum: data.sum + transaction.amount - prev,
          };
        }
        return data;
      });
  }

  removeAmountTotalDebitCreditData(transaction: TransactionType): void {
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === transaction.type) {
          return {
            type: transaction.type,
            sum: data.sum - transaction.amount,
          };
        }
        return data;
      });
  }

  addTransaction(transaction: TransactionType): void {
    this.transactions = [...this.transactions, transaction];
    this.addAmountTotalDebitCreditData(transaction, 0);
  }

  deleteTransaction(data: { id: number }): void {
    const { id } = data;
    const transaction: TransactionType | undefined = this.transactions.find(
      (data) => data.id === id
    );
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    if (transaction) {
      this.removeAmountTotalDebitCreditData(transaction);
    }
  }

  updateTransaction(transaction: TransactionType): void {
    const { id } = transaction;
    let prevTransactionAmount: number = 0;
    let filteredTransactions = this.transactions.filter((data) => {
      const { amount } = data;
      if (id !== data.id) {
        return data;
      }
      prevTransactionAmount = amount;
    });
    filteredTransactions = [...filteredTransactions, transaction];
    this.transactions = filteredTransactions;
    this.addAmountTotalDebitCreditData(transaction, prevTransactionAmount);
  }

  get getLatestTransactions(): TransactionType[] {
    let latestTransactions: TransactionType[] = [];
    const transactions: TransactionType[] = this.transactions.slice();
    latestTransactions = transactions
      ?.sort((first, second) => +new Date(second.date) - +new Date(first.date))
      .slice(0, NUMBER_OF_TRANSACTIONS);
    return latestTransactions;
  }
}

export default new TransactionStore();
