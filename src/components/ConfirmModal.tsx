import React, { useEffect, useState } from "react";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import { ACTION_TYPES } from "../constants";
import { observer } from "mobx-react-lite";
import {
  ConfirmModalType,
  ReactElementFunctionType,
  ReactNodeFunctionType,
  VoidFunctionType,
} from "../types";
import { useTranslation } from "react-i18next";

const ConfirmModal: React.FC<ConfirmModalType> = observer(
  ({ onClose, isLoading, action, actionHandler }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { t } = useTranslation();
    useEffect(() => {
      setIsVisible(true); // Trigger the animation when modal is mounted
    }, []);

    const renderActionHeading: ReactNodeFunctionType = () => {
      switch (action) {
        case ACTION_TYPES.delete:
          return (
            <>
              <p className="font-semibold text-lg dark:text-slate-200">
                {t("confirmModal.delete.title")}
              </p>
              <p className="text-slate-500 text-xs mt-1 dark:text-slate-300">
                {t("confirmModal.delete.description")}
              </p>
            </>
          );
        case ACTION_TYPES.logout:
          return (
            <>
              <p className="font-semibold text-lg dark:text-slate-200">
                {t("confirmModal.logout.title")}
              </p>
              <p className="text-slate-500 text-xs mt-1 dark:text-slate-300">
                {t("confirmModal.logout.description")}
              </p>
            </>
          );
        default:
          break;
      }
    };

    const handleCloseModal: VoidFunctionType = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose(); // Close the modal after the animation
      }, 300); // Match the animation duration
    };

    const buttonText: () => string = () => {
      if (action === ACTION_TYPES.delete) {
        return t("confirmModal.delete.buttons.yes");
      }
      return t("confirmModal.logout.buttons.yes");
    };

    const renderModalButtons: ReactElementFunctionType = () => {
      return (
        <div className="flex items-center gap-4 mt-4 text-sm">
          <button
            onClick={actionHandler}
            className="bg-red-600 hover:bg-red-500 text-white rounded-xl py-2 px-4 flex items-center justify-center"
          >
            {isLoading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <p className="text-sm">{buttonText()}</p>
            )}
          </button>
          <button
            onClick={handleCloseModal}
            className="border-slate-200 dark:border-slate-600 dark:text-slate-200 border-2 px-4 py-2 text-black rounded-xl"
          >
            {t("confirmModal.delete.buttons.no")}
          </button>
        </div>
      );
    };

    const RenderModalIcon: ReactElementFunctionType = () => {
      return (
        <div className="bg-orange-100 h-[48px] w-[54px] rounded-full flex justify-center items-center">
          <div className="bg-orange-200 h-[36px] w-[36px] rounded-full flex justify-center items-center">
            <IoWarningOutline className="text-orange-600 text-2xl" />
          </div>
        </div>
      );
    };

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-60 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`relative flex  flex-col justify-center rounded-xl dark:bg-slate-800 bg-white px-4 py-6 transform transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-90"
          }`}
        >
          <button onClick={handleCloseModal} className="absolute right-6 top-4">
            <IoClose className="text-xl dark:text-white text-slate-600" />
          </button>

          <div className="flex items-start gap-4">
            {RenderModalIcon()}

            <div className="flex flex-col mt-[-4px] pr-[40px]">
              <div className="max-w-[300px]">{renderActionHeading()}</div>
              {renderModalButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ConfirmModal;
