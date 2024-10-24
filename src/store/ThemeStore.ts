import { makeAutoObservable, reaction } from "mobx";

class ThemeStore {
  theme: string = localStorage.getItem("theme") || "light";
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    reaction(
      () => this.theme.slice(),
      (theme) => {
        localStorage.setItem("theme", theme);
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
