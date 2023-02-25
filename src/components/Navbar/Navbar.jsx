import React, { useEffect, useState } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import i18next from "i18next";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Navbar() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [lang, setLang] = useLocalStorage("lang", "en");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    i18next.changeLanguage(lang);
  }, [lang]);

  const changeTheme = (theme) => {
    if (theme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const changeLanguage = (lang) => {
    if (lang === "en") {
      setLang("en");
    } else {
      setLang("ru");
    }
  };

  return (
    <nav className="text-3xl flex items-center justify-between py-2 p-5">
      <a href={window.location.hostname} className="cursor-pointer">
        Kanban Board
      </a>
      <div className="flex flex-row gap-2">
        <div className="dropdown dropdown-end" title="Change Language">
          <label tabIndex={0} className="btn m-1">
            <TranslateIcon fontSize="small" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box text-sm w-52 p-2"
          >
            <li
              onClick={() => {
                changeLanguage("en");
              }}
              className="flex "
            >
              <button className={lang === "en" ? "active" : ""}>
                <img
                  src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"
                  loading="lazy"
                  className="w-5"
                ></img>
                <a>English</a>
              </button>
            </li>
            <li
              onClick={() => {
                changeLanguage("ru");
              }}
              className="flex"
            >
              <button className={lang === "en" ? "" : "active"}>
                <img
                  src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f7-1f1fa.svg"
                  loading="lazy"
                  className="w-5"
                ></img>
                <a>Русский</a>
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end" title="Change Theme">
          <label tabIndex={0} className="btn m-1 normal-case">
            Theme
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box text-sm w-52 p-2"
          >
            <li onClick={() => changeTheme("dark")}>
              <button className={theme == "dark" ? "active" : ""}>
                <DarkModeIcon />
                <a>Dark</a>
              </button>
            </li>
            <li onClick={() => changeTheme("light")}>
              <button className={theme == "dark" ? "" : "active"}>
                <LightModeIcon />
                <a>Light</a>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
