import React from "react";
import logo from "../../assets/Rick_and_Morty_Logo.webp";
import { useLanguage } from "../../translations/LanguageContext";
import "./Header.css";
import languages from "../../translations/languages";

interface HeaderProps {
  isInfiniteScroll: boolean;
  toggleScrollMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isInfiniteScroll, toggleScrollMode }) => {
  const { state, dispatch } = useLanguage();
  const lang = languages[state.language];

  return (
    <header className="header-container">
      <img src={logo} alt="Rick and Morty Logo" className="logo-image" />

      <div className="header-controls">
        <button
          className={`scroll-toggle ${isInfiniteScroll ? 'infinite' : 'pagination'}`}
          onClick={toggleScrollMode}
        >
          {isInfiniteScroll ? lang.infiniteScrollDisable : lang.infiniteScrollEnable}
        </button>
        <div className="language-buttons">
          <button
            className={`language-btn ${state.language === "en" ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_LANGUAGE", payload: "en" })}
          >
            EN
          </button>
          <button
            className={`language-btn ${state.language === "de" ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_LANGUAGE", payload: "de" })}
          >
            DE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;