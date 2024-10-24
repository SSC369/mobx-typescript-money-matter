import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { observer } from "mobx-react-lite";

import LoadingButton from "./LoadingButton";
import {
  ACTION_TYPES,
  API_ADD_TRANSACTION,
  CATEGORY_OPTIONS,
  SUCCESS_OK,
  TRANSACTION_TYPES,
} from "../constants";
import { InputElement, InputLabel, SelectInput } from "./InputComponents";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import userStore from "../store/UserStore";
import transactionStore from "../store/TransactionStore";
import {
  AddTransactionModalType,
  ReactElementFunctionType,
  TransactionFormData,
  TransactionType,
  VoidFunctionType,
} from "../types";

const AddTransactionModal: React.FC<AddTransactionModalType> = observer(
  ({ onClose }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<TransactionFormData>({
      name: "",
      type: "",
      category: "",
      amount: 0,
      date: "",
    });
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const userId: number = userStore.userContextData!.userId;

    useEffect(() => {
      setIsVisible(true); // Trigger the animation when modal is mounted
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const transactionValidation: () => boolean = () => {
      const { name, category, date, type, amount } = formData;
      const trimmedName = name.trim();

      if (trimmedName === "") {
        toast.error("Please enter name");
        return false;
      } else if (category === "") {
        toast.error("Please enter category");
        return false;
      } else if (date === "") {
        toast.error("Please enter date");
        return false;
      } else if (type === "") {
        toast.error("Please enter type");
        return false;
      } else if (amount === 0) {
        toast.error("Please enter amount");
        return false;
      }

      return true;
    };

    const handleSuccess: (data: TransactionType) => void = (data) => {
      toast.success("Transaction Added");
      transactionStore.addTransaction(data);
      setFormData({
        name: "",
        type: "",
        category: "",
        amount: 0,
        date: "",
      });
      onClose();
    };

    const handleAddTransaction = async (
      e: React.FormEvent<EventTarget>
    ): Promise<void> => {
      try {
        setAddLoading(true);
        e.preventDefault();
        if (transactionValidation()) {
          const { name, category, date, type, amount } = formData;
          const url = API_ADD_TRANSACTION;

          const res = await axios.post(
            url,
            {
              name,
              category,
              date,
              type,
              amount,
              user_id: userId,
            },
            {
              headers: TRANSACTION_HEADERS(userId),
            }
          );

          if (res.status === SUCCESS_OK) {
            handleSuccess(res.data.insert_transactions_one);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setAddLoading(false);
      }
    };

    const handleCloseModal: VoidFunctionType = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose(); // Close the modal after the animation
      }, 300); // Match the animation duration
    };

    const categoriesDropdown: ReactElementFunctionType = () => {
      return (
        <div className="relative flex flex-col gap-1">
          <InputLabel name="Category" />
          <SelectInput
            onChange={handleSelectChange}
            value={formData.category}
            name="category"
          >
            {CATEGORY_OPTIONS.map((option) => {
              const { name, value } = option;
              return (
                <option key={value} value={value}>
                  {name}
                </option>
              );
            })}
          </SelectInput>

          <div className="pointer-events-none absolute top-9 right-3 flex items-center text-slate-600">
            <FiChevronDown className="w-5 h-5" />
          </div>
        </div>
      );
    };

    const transactionsDropdown: ReactElementFunctionType = () => {
      return (
        <div className="relative flex flex-col gap-1">
          <InputLabel name="Transaction Type" />
          <SelectInput
            name="type"
            onChange={handleSelectChange}
            value={formData.type}
          >
            {TRANSACTION_TYPES.map((option) => {
              const { name, value } = option;
              return (
                <option key={value} value={value}>
                  {name}
                </option>
              );
            })}
          </SelectInput>

          <div className="pointer-events-none absolute top-9 right-3 flex items-center text-slate-600">
            <FiChevronDown className="w-5 h-5" />
          </div>
        </div>
      );
    };

    const renderNameInput: ReactElementFunctionType = () => {
      return (
        <InputElement
          required
          name="name"
          type="text"
          placeholder="Enter Name"
          onChange={handleChange}
          value={formData.name}
        />
      );
    };

    const renderAmountInput: ReactElementFunctionType = () => {
      return (
        <InputElement
          required={true}
          onChange={handleChange}
          value={formData.amount}
          type="number"
          name="amount"
          placeholder="Enter Amount"
        />
      );
    };

    const renderDateInput: ReactElementFunctionType = () => {
      return (
        <InputElement
          required
          type="datetime-local"
          placeholder="Enter Date"
          onChange={handleChange}
          value={formData.date}
          name="date"
        />
      );
    };

    const renderFormCloseButton: ReactElementFunctionType = () => {
      return (
        <button onClick={handleCloseModal} className="absolute right-6 top-4">
          <IoClose className="text-xl text-slate-600 dark:text-white" />
        </button>
      );
    };

    const renderAddTransactionHeaders: ReactElementFunctionType = () => {
      return (
        <>
          <h1 className="text-xl dark:text-slate-200 font-semibold">
            Add Transaction
          </h1>
          {renderFormCloseButton()}
          <p className="text-slate-500 dark:text-slate-300 text-xs mt-2">
            Add your transaction
          </p>
        </>
      );
    };

    const renderTransactionAddForm: ReactElementFunctionType = () => {
      return (
        <form
          onSubmit={handleAddTransaction}
          className="flex flex-col gap-3 mt-3"
        >
          {renderNameInput()}
          {transactionsDropdown()}
          {categoriesDropdown()}
          {renderAmountInput()}
          {renderDateInput()}

          <LoadingButton action={ACTION_TYPES.add} isLoading={addLoading} />
        </form>
      );
    };

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`relative flex  w-[400px] flex-col justify-center rounded-xl dark:bg-slate-800 bg-white px-4 py-6 transform transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-90"
          }`}
        >
          {renderAddTransactionHeaders()}
          {renderTransactionAddForm()}
        </div>
      </div>
    );
  }
);

export default AddTransactionModal;
