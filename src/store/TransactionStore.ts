import { makeAutoObservable } from "mobx";
import { NUMBER_OF_TRANSACTIONS } from "../constants";
import { CreditAndDebitTotalType, TransactionType } from "../types";
import TransactionModel from "./TransactionModel";

class TransactionStore {
  totalDebitCreditTransactionsData: CreditAndDebitTotalType = [];
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
  get getTotalDebitCreditTransactionsData(): CreditAndDebitTotalType {
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
    this.totalDebitCreditTransactionsData = data;
  }

  addAmountTotalDebitCreditData(type: string, amount: number): void {
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === type) {
          return {
            type: type,
            sum: data.sum + amount,
          };
        }
        return data;
      });
  }

  removeAmountTotalDebitCreditData(type: string, amount: number): void {
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === type) {
          return {
            type: type,
            sum: data.sum - amount,
          };
        }
        return data;
      });
  }

  addTransaction(transaction: TransactionModel): void {
    this.transactions.push(transaction);
    this.addAmountTotalDebitCreditData(transaction.type, transaction.amount);
  }

  deleteTransaction(data: { id: number }): void {
    const { id } = data;
    const transaction: TransactionModel = this.transactions.find(
      (data) => data.id === id
    )!;
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    this.removeAmountTotalDebitCreditData(transaction.type, transaction.amount);
  }

  get getLatestTransactions(): TransactionModel[] {
    let latestTransactions: TransactionModel[] = [];
    const transactions: TransactionModel[] = this.transactions.slice();
    latestTransactions = transactions
      ?.sort((first, second) => +new Date(second.date) - +new Date(first.date))
      .slice(0, NUMBER_OF_TRANSACTIONS);
    return latestTransactions;
  }

  getTransaction(id: number): TransactionModel | undefined {
    return this.transactions.find((transaction) => transaction.id === id);
  }
}

export default new TransactionStore();
