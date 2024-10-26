import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { observer } from "mobx-react-lite";
import { NavigateFunction, useNavigate } from "react-router-dom";

import SidebarOption from "./SidebarOption";
import ConfirmModal from "./ConfirmModal";
import {
  ACTION_TYPES,
  API_PROFILE_URL,
  LANGUAGES,
  LOCALSTORAGE_KEY,
  LOGIN_ROUTE,
  SIDEBAR_OPTIONS,
  SUCCESS_OK,
} from "../constants";
import {
  addLangugageIntoLocalStorage,
  removeDataFromLocalStorage,
} from "../utils/localStorageUtils";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import { sidebarContainer } from "../styles";
import userStore from "../store/UserStore";
import {
  LanguageOptionType,
  ReactElementFunctionType,
  SidebarOptionsEnum,
  UserProfileDataType,
  VoidFunctionType,
  VoidPromiseFunctionType,
} from "../types";
import { useTranslation } from "react-i18next";
import LanguageOption from "./LanguageOption";
import { v4 } from "uuid";
import i18next from "i18next";
import { FiChevronDown } from "react-icons/fi";

const Sidebar: React.FC = observer(() => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserProfileDataType | null>(null);
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

  const { userId } = userStore.userContextData!;

  const { t } = useTranslation();

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile: VoidPromiseFunctionType = async () => {
    try {
      const url = API_PROFILE_URL;
      const res = await axios.get(url, {
        headers: TRANSACTION_HEADERS(userId),
      });

      if (res.status === SUCCESS_OK) {
        setUserData(res.data.users[0]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleLogout: VoidFunctionType = () => {
    try {
      setIsLogoutLoading(true);
      removeDataFromLocalStorage(LOCALSTORAGE_KEY);
      toast.success("Logout successful", { duration: 1000 });
      navigate(LOGIN_ROUTE);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const renderHeader: ReactElementFunctionType = () => {
    return (
      <h1
        style={{ color: "rgba(248, 154, 35, 1)" }}
        className="font-bold hidden md:block text-xl text-center mb-6"
      >
        {t("header.logo.firstWord")}
        <span className="ml-1" style={{ color: "rgba(2, 150, 156, 1)" }}>
          {t("header.logo.secondWord")}
        </span>
      </h1>
    );
  };

  const renderOptions: ReactElementFunctionType = () => {
    const options: SidebarOptionsEnum[] = SIDEBAR_OPTIONS;
    return (
      <ul className="flex flex-col w-full mb-6">
        {options.map((option) => (
          <SidebarOption key={option} option={option} />
        ))}
      </ul>
    );
  };

  const handleShowAlertModal: VoidFunctionType = () => {
    setShowAlertModal(true);
  };

  const renderProfile: ReactElementFunctionType = () => {
    return (
      <div className="flex gap-2 items-start px-2 mt-auto">
        <FaCircleUser className="text-2xl text-blue-600" />
        <div className="flex flex-col flex-grow text-xs">
          <p className="font-medium dark:text-white">{userData?.name}</p>
          <p className="font-medium text-slate-400">{userData?.email}</p>
        </div>
        <button onClick={handleShowAlertModal}>
          <LuLogOut color="rgba(113, 142, 191, 1)" className="text-lg " />
        </button>
      </div>
    );
  };

  const renderConfirmModal: ReactElementFunctionType = () => {
    if (showAlertModal) {
      return (
        <ConfirmModal
          onClose={() => setShowAlertModal(false)}
          isLoading={isLogoutLoading}
          action={ACTION_TYPES.logout}
          actionHandler={handleLogout}
        />
      );
    }
    return <></>;
  };

  const handleMenuClose: VoidFunctionType = () => {
    userStore.toggleMenu();
  };

  const renderLanguages: ReactElementFunctionType = () => {
    const changeLanguage = (lng: string) => i18next.changeLanguage(lng);
    const currentLanguage: string = i18next.language;

    const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const modifiedLanguage = e.target.value;

      changeLanguage(modifiedLanguage);
      addLangugageIntoLocalStorage(modifiedLanguage);
      handleMenuClose();
    };

    return (
      <div className="relative flex flex-col gap-1 w-[80%] self-center">
        <select
          onChange={handleChangeLanguage}
          className="border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm px-2 py-2 appearance-none rounded-lg bg-slate-100 text-slate-500 outline-none font-medium cursor-pointer"
          value={currentLanguage}
        >
          {LANGUAGES.map((language: LanguageOptionType) => {
            return <LanguageOption key={v4()} language={language} />;
          })}
        </select>
        <div className="pointer-events-none absolute top-2.5 right-3 flex items-center text-slate-500 dark:text-slate-200">
          <FiChevronDown className="w-5 h-5" />
        </div>
      </div>
    );
  };

  let isMenuClosable: boolean = userStore.showMenu || window.innerWidth >= 768;

  return (
    <div
      style={
        isMenuClosable
          ? { display: "flex", justifyContent: "space-between" }
          : { display: "none" }
      }
      className={sidebarContainer}
    >
      {renderHeader()}
      <button onClick={handleMenuClose} className="md:hidden self-end mr-2">
        <IoClose className="text-xl dark:text-white" />
      </button>
      {renderOptions()}
      {renderLanguages()}
      {renderProfile()}
      {renderConfirmModal()}
    </div>
  );
});

export default Sidebar;
