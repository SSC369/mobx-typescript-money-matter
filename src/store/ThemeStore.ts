import { makeAutoObservable, reaction } from "mobx";

import { LIGHT_MODE_KEY, THEME_KEY } from "../constants";

class ThemeStore {
  theme: string = localStorage.getItem(THEME_KEY) || LIGHT_MODE_KEY;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    reaction(
      () => this.theme.slice(),
      (theme) => {
        localStorage.setItem(THEME_KEY, theme);
      }
    );
  }

  changeTheme(mode: string): void {
    this.theme = mode;
  }

  get getTheme(): string {
    return this.theme;
  }
}

export default new ThemeStore();
