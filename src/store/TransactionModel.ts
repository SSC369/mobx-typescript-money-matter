import { TransactionResponseType } from "../types";
import transactionStore from "./TransactionStore";

class TransactionModel {
  transactionName: string;
  id: number;
  type: string;
  date: string;
  category: string;
  amount: number;
  constructor(
    transactionName: string,
    id: number,
    type: string,
    date: string,
    category: string,
    amount: number
  ) {
    this.transactionName = transactionName;
    this.id = id;
    this.type = type;
    this.date = date;
    this.amount = amount;
    this.category = category;
  }

  updateTransaction(transaction: TransactionResponseType): void {
    const { transaction_name, type, date, category, amount } = transaction;
    const modelTypeTotalObject = transactionStore.getTransactionTypeTotal(
      this.type
    );
    modelTypeTotalObject.removeAmount(this.amount, this.type);

    const transactionTypeTotalObject =
      transactionStore.getTransactionTypeTotal(type);
    transactionTypeTotalObject.addAmount(amount, type);

    this.transactionName = transaction_name;
    this.type = type;
    this.date = date;
    this.category = category;
    this.amount = amount;
  }
}

export default TransactionModel;
