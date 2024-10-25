import React from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import { observer } from "mobx-react-lite";

import { VoidFunctionType } from "../types";
import themeStore from "../store/ThemeStore";
import { DARK_MODE_KEY, LIGHT_MODE_KEY } from "../constants";

const ToggleButton: React.FC = observer(() => {
  const theme: string = themeStore.getTheme;

  const handleToggle: VoidFunctionType = () => {
    themeStore.changeTheme(LIGHT_MODE_KEY);
  };

  const handleLightTheme: VoidFunctionType = () => {
    themeStore.changeTheme(DARK_MODE_KEY);
  };

  return (
    <div className="p-2 rounded-xl cursor-pointer text-2xl">
      {theme === DARK_MODE_KEY ? (
        <MdSunny onClick={handleToggle} color="orange" />
      ) : (
        <RiMoonFill onClick={handleLightTheme} className="text-slate-400" />
      )}
    </div>
  );
});

export default ToggleButton;
