import { makeAutoObservable } from "mobx";

import { NUMBER_OF_TRANSACTIONS } from "../constants";
import { CreditAndDebitTotalType, TransactionType } from "../types";
import TransactionModel from "./TransactionModel";
import TotalTransactionsModel from "./TotalTransactionsModel";

class TransactionStore {
  totalDebitCreditTransactionsData: TotalTransactionsModel[] = [];
  transactions: TransactionModel[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  sortTransactions(): TransactionModel[] {
    let sortedTransactions: TransactionModel[] = [];
    const transactions: TransactionModel[] = this.transactions.slice();
    sortedTransactions = transactions?.sort(
      (first, second) => +new Date(second.date) - +new Date(first.date)
    );
    return sortedTransactions;
  }

  get getTransactions(): TransactionModel[] {
    return this.sortTransactions();
  }
  get getTotalDebitCreditTransactionsData(): TotalTransactionsModel[] {
    return this.totalDebitCreditTransactionsData;
  }

  setTransactions(data: TransactionType[]): void {
    data.forEach((transaction) => {
      const { transaction_name, amount, type, id, date, category } =
        transaction;
      const transactionObject = new TransactionModel(
        transaction_name,
        id,
        type,
        date,
        category,
        amount
      );
      this.transactions.push(transactionObject);
    });
  }

  setTotalDebitCreditTransactionsData(data: CreditAndDebitTotalType): void {
    data.forEach((total) => {
      const { type, sum } = total;
      const totalTransactionObject = new TotalTransactionsModel(sum, type);
      this.totalDebitCreditTransactionsData.push(totalTransactionObject);
    });
  }

  addTransaction(transaction: TransactionType): void {
    const { transaction_name, amount, type, id, date, category } = transaction;
    const transactionObject = new TransactionModel(
      transaction_name,
      id,
      type,
      date,
      category,
      amount
    );
    this.transactions.push(transactionObject);
    const totalObj = this.getTransactionTypeTotal(type);
    totalObj.addAmount(amount, type);
  }

  deleteTransaction(data: { id: number }): void {
    const { id } = data;
    const transaction: TransactionModel = this.transactions.find(
      (data) => data.id === id
    )!;
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    const { type, amount } = transaction;
    const totalObj = this.getTransactionTypeTotal(type);
    totalObj.removeAmount(amount, type);
  }

  get getLatestTransactions(): TransactionModel[] {
    let latestTransactions: TransactionModel[] = [];
    const transactions: TransactionModel[] = this.transactions.slice();
    latestTransactions = transactions
      ?.sort((first, second) => +new Date(second.date) - +new Date(first.date))
      .slice(0, NUMBER_OF_TRANSACTIONS);
    return latestTransactions;
  }

  getTransaction(id: number): TransactionModel {
    return this.transactions.find((transaction) => transaction.id === id)!;
  }

  getTransactionTypeTotal(type: string): TotalTransactionsModel {
    return this.totalDebitCreditTransactionsData.find(
      (total) => total.type === type
    )!;
  }
}

export default new TransactionStore();
