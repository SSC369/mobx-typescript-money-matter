import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { TransactionContext } from "../context/transactionContext";
import creditImage from "../assets/credit.png";
import debitImage from "../assets/debit.png";
import Loader from "../components/Loader";
import { TRANSACTION_TYPES_OBJECT } from "../constants";
import transactionStore from "../store/TransactionStore";

const TotalDebitCredit: React.FC = observer(() => {
  const {
    isTotalDebitCreditTransactionsLoading,
    totalDebitCreditTransactionsError,
  } = useContext(TransactionContext)!;

  if (totalDebitCreditTransactionsError) {
    return <h1>Something went wrong !!!</h1>;
  }

  const totalDebitCreditTransactionsData =
    transactionStore.totalDebitCreditTransactionsData;

  const renderImage: (isTypeCredit: boolean) => React.ReactElement = (
    isTypeCredit
  ) => {
    if (isTypeCredit) {
      return (
        <img
          className="h-24"
          src={creditImage}
          alt={TRANSACTION_TYPES_OBJECT.credit}
        />
      );
    }
    return (
      <img
        className="h-24"
        src={debitImage}
        alt={TRANSACTION_TYPES_OBJECT.debit}
      />
    );
  };

  return (
    <div>
      {isTotalDebitCreditTransactionsLoading ? (
        <div className="flex items-center justify-center h-[100px]">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row  items-center gap-4 justify-around mx-auto">
          {totalDebitCreditTransactionsData?.map((total, index) => {
            const { type, sum } = total;

            const isTypeCredit: boolean =
              type === TRANSACTION_TYPES_OBJECT.credit;

            return (
              <div
                key={index}
                className="flex items-start bg-white dark:bg-slate-700 rounded-xl p-2 pl-6 justify-between w-3/4 md:w-2/4 "
              >
                <div>
                  <p
                    className="text-3xl font-semibold"
                    style={
                      isTypeCredit
                        ? { color: "rgba(22, 219, 170, 1)" }
                        : { color: "rgba(254, 92, 115, 1)" }
                    }
                  >
                    ${sum}
                  </p>
                  <p className="text-sm dark:text-slate-200 text-slate-600">
                    {type}
                  </p>
                </div>

                {renderImage(isTypeCredit)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default TotalDebitCredit;
