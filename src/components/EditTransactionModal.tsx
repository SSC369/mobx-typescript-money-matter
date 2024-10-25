import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { observer } from "mobx-react-lite";

import LoadingButton from "./LoadingButton";
import {
  ACTION_TYPES,
  API_UPDATE_TRANSACTION,
  CATEGORY_OPTIONS,
  INPUT_DATE_FORMAT,
  SUCCESS_OK,
  TRANSACTION_TYPES,
} from "../constants";
import { InputElement, InputLabel, SelectInput } from "./InputComponents";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import userStore from "../store/UserStore";
import transactionStore from "../store/TransactionStore";
import TransactionModel from "../store/TransactionModel";
import {
  EditTransactionModalType,
  ReactElementFunctionType,
  TransactionFormData,
  TransactionType,
  VoidFunctionType,
} from "../types";

const EditTransactionModal: React.FC<EditTransactionModalType> = observer(
  ({ onClose, data }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { transaction_name, type, category, amount, date, id } = data;

    const [formData, setFormData] = useState<TransactionFormData>({
      name: transaction_name,
      type,
      category,
      amount,
      id,
      date: dayjs(new Date(date)).format(INPUT_DATE_FORMAT),
    });
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
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
      if (!trimmedName) {
        toast.error("Please enter name");
        return false;
      } else if (!category) {
        toast.error("Please enter category");
        return false;
      } else if (!date) {
        toast.error("Please enter date");
        return false;
      } else if (!type) {
        toast.error("Please enter type");
        return false;
      } else if (amount === 0) {
        toast.error("Please enter amount");
        return false;
      }
      return true;
    };

    const handleEditSuccess: (data: TransactionType) => void = (
      transaction
    ) => {
      toast.success("Transaction Updated");
      const { id } = transaction;
      const transactionObject = transactionStore.getTransaction(id)!;
      transactionObject.updateTransaction(transaction);
      setFormData({
        name: "",
        type: "",
        category: "",
        amount: 0,
        date: "",
      });
      onClose();
    };

    const handleEditTransaction = async (
      e: React.FormEvent<EventTarget>
    ): Promise<void> => {
      e.preventDefault();
      try {
        setIsEditLoading(true);
        if (transactionValidation()) {
          const { name, category, date, type, amount, id } = formData;
          const url = API_UPDATE_TRANSACTION;
          const res = await axios.post(
            url,
            {
              name,
              category,
              date,
              type,
              amount,
              id,
            },
            {
              headers: TRANSACTION_HEADERS(userId),
            }
          );

          if (res.status === SUCCESS_OK) {
            handleEditSuccess(res.data.update_transactions_by_pk);
          } else {
            toast.error("Response is " + res.status);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsEditLoading(false);
      }
    };

    const handleCloseModal: VoidFunctionType = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose(); // Close the modal after the animation
      }, 300); // Match the animation duration
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
          required
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

    const renderFormCloseButton: ReactElementFunctionType = () => {
      return (
        <button
          onClick={handleCloseModal}
          className="absolute right-6 top-4 group"
        >
          <IoClose className="text-xl text-slate-600 d+ark:text-white group-hover:text-white" />
        </button>
      );
    };

    const renderEditTransactionHeaders: ReactElementFunctionType = () => {
      return (
        <>
          <h1 className="text-xl font-semibold dark:text-slate-200">
            Update Transaction
          </h1>
          {renderFormCloseButton()}
          <p className="dark:text-slate-300 text-slate-500 text-xs mt-1">
            Update your transaction
          </p>
        </>
      );
    };

    const renderTransactionEditForm: ReactElementFunctionType = () => {
      return (
        <form
          onSubmit={handleEditTransaction}
          className="flex flex-col gap-3 mt-3"
        >
          {renderNameInput()}
          {transactionsDropdown()}
          {categoriesDropdown()}
          {renderAmountInput()}
          {renderDateInput()}

          <LoadingButton action={ACTION_TYPES.edit} isLoading={isEditLoading} />
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
          className={`relative flex  w-[400px] flex-col justify-center rounded-xl bg-white px-4 py-6 transform transition-transform duration-300 dark:bg-slate-800  ${
            isVisible ? "scale-100" : "scale-90"
          }`}
        >
          {renderEditTransactionHeaders()}
          {renderTransactionEditForm()}
        </div>
      </div>
    );
  }
);

export default EditTransactionModal;
