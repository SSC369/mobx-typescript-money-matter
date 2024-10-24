import { makeAutoObservable } from "mobx";
import { LOCALSTORAGE_KEY } from "../constants";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { LocalStorageDataType, UserContextDataType } from "../types";

class UserStore {
  showMenu: boolean = false;
  userData: LocalStorageDataType = getDataFromLocalStorage(LOCALSTORAGE_KEY);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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
