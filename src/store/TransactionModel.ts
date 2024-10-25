import { TransactionType } from "../types";
import TransactionStore from "./TransactionStore";

class TransactionModel {
  transaction_name;
  id;
  type;
  date;
  category;
  amount;
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

  updateTransaction(transaction: TransactionType) {
    const { transaction_name, id, type, date, category, amount } = transaction;
    TransactionStore.removeAmountTotalDebitCreditData(this.type, this.amount);
    TransactionStore.addAmountTotalDebitCreditData(type, amount);
    this.transaction_name = transaction_name;
    this.id = id;
    this.type = type;
    this.date = date;
    this.category = category;
    this.amount = amount;
  }
}

export default TransactionModel;
