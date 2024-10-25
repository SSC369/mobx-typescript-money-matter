class TotalTransactionsModel {
  sum;
  type;
  constructor(sum: number, type: string) {
    this.sum = sum;
    this.type = type;
  }

  addAmount(sum: number, type: string) {
    this.sum += sum;
    this.type = type;
  }

  removeAmount(sum: number, type: string) {
    this.sum -= sum;
    this.type = type;
  }
}

export default TotalTransactionsModel;
