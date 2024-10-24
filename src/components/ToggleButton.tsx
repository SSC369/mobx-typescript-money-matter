import React from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import themeStore from "../store/ThemeStore";
import { observer } from "mobx-react-lite";

import { VoidFunctionType } from "../types";

const ToggleButton: React.FC = observer(() => {
  const theme: string = themeStore.getTheme;

  const handleToggle: VoidFunctionType = () => {
    themeStore.changeTheme("light");
  };

  const handleLightTheme: VoidFunctionType = () => {
    themeStore.changeTheme("dark");
  };

  return (
    <div className="p-2 rounded-xl cursor-pointer text-2xl">
      {theme === "dark" ? (
        <MdSunny onClick={handleToggle} color="orange" />
      ) : (
        <RiMoonFill onClick={handleLightTheme} className="text-slate-400" />
      )}
    </div>
  );
});

export default ToggleButton;
