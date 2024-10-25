import { TransactionType } from "../types";
import transactionStore from "./TransactionStore";

class TransactionModel {
  transaction_name: string;
  id: number;
  type: string;
  date: string;
  category: string;
  amount: number;
  constructor(
    transaction_name: string,
    id: number,
    type: string,
    date: string,
    category: string,
    amount: number
  ) {
    this.transaction_name = transaction_name;
    this.id = id;
    this.type = type;
    this.date = date;
    this.amount = amount;
    this.category = category;
  }

  updateTransaction(transaction: TransactionType): void {
    const { transaction_name, id, type, date, category, amount } = transaction;
    const modelTypeTotalObject = transactionStore.getTransactionTypeTotal(
      this.type
    );
    modelTypeTotalObject.removeAmount(this.amount, this.type);

    const transactionTypeTotalObject =
      transactionStore.getTransactionTypeTotal(type);
    transactionTypeTotalObject.addAmount(amount, type);

    this.transaction_name = transaction_name;
    this.id = id;
    this.type = type;
    this.date = date;
    this.category = category;
    this.amount = amount;
  }
}

export default TransactionModel;
