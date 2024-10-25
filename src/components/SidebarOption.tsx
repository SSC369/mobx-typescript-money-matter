import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TbReceiptDollar } from "react-icons/tb";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import userStore from "../store/UserStore";
import {
  ReactElementFunctionType,
  SidebarOptionPropsType,
  SidebarOptionsEnum,
  VoidFunctionType,
} from "../types";
import { NAVIGATION_PATHS } from "../constants";
import { useTranslation } from "react-i18next";

const SidebarOption: React.FC<SidebarOptionPropsType> = observer(
  ({ option }) => {
    const { isAdmin } = userStore.userContextData!;
    const navigate: NavigateFunction = useNavigate();
    const path: string = window.location.pathname;
    const { t } = useTranslation();
    const currentPath: string = NAVIGATION_PATHS[option];

    const renderOption: ReactElementFunctionType = () => {
      switch (option) {
        case SidebarOptionsEnum.DASHBOARD:
          return (
            <>
              <GoHomeFill className="text-xl" />
              <p className="font-medium text-base first-letter:capitalize">
                {t(`sidebar.${SidebarOptionsEnum.DASHBOARD}`)}
              </p>
            </>
          );

        case SidebarOptionsEnum.TRANSACTION:
          return (
            <>
              <TbReceiptDollar className="text-xl" />
              <p className="font-medium text-base first-letter:capitalize ">
                {isAdmin
                  ? "All " + t(`sidebar.${SidebarOptionsEnum.TRANSACTION}`)
                  : t(`sidebar.${SidebarOptionsEnum.TRANSACTION}`)}
              </p>
            </>
          );
        default:
          return <></>;
      }
    };

    const isCurrentPath: boolean = path === currentPath;

    const renderPointer: ReactElementFunctionType = () => {
      if (isCurrentPath) {
        return (
          <div className="w-2 h-14 bg-blue-600 absolute left-0 rounded-e-lg"></div>
        );
      }
      return <></>;
    };

    const handleClickSidebarOption: VoidFunctionType = () => {
      navigate(NAVIGATION_PATHS[option]);
      if (window.innerWidth < 768) {
        userStore.toggleMenu();
      }
    };

    return (
      <li
        onClick={handleClickSidebarOption}
        style={isCurrentPath ? { color: "rgba(45, 96, 255, 1)" } : {}}
        className="flex items-center gap-3 text-slate-500 relative pl-8 h-16 cursor-pointer dark:text-slate-200"
      >
        {renderPointer()}
        {renderOption()}
      </li>
    );
  }
);

export default SidebarOption;
