"use client";

import { setSettings } from "@/actions/helpers/actions";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function SetTheme({ theme }) {
  const handleTheme = async (data) => {
    let theme = { theme: data };
    await setSettings(theme);
  };

  return (
    <>
      {theme === "dark" ? (
        <span className="interactive" onClick={() => handleTheme("light")}>
          <MdLightMode />
        </span>
      ) : (
        <span className="interactive" onClick={() => handleTheme("dark")}>
          <MdDarkMode />
        </span>
      )}
    </>
  );
}
