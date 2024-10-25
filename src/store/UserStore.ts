import { makeAutoObservable } from "mobx";

import { LocalStorageDataType, UserContextDataType } from "../types";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { LOCALSTORAGE_KEY } from "../constants";

class UserStore {
  showMenu: boolean = false;
  userData: LocalStorageDataType = getDataFromLocalStorage(LOCALSTORAGE_KEY);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUserData(data: LocalStorageDataType) {
    this.userData = data;
  }

  get getUserData(): LocalStorageDataType | null {
    return this.userData;
  }

  get userContextData(): UserContextDataType | null {
    if (this.userData?.userId) {
      const { userId, admin } = this.userData;
      return { userId, isAdmin: admin, showMenu: this.showMenu };
    }
    return null;
  }
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}

export default new UserStore();
