import React, { createContext, useReducer, useContext } from "react";

type State = { language: "en" | "de" };
type Action = { type: "SET_LANGUAGE"; payload: "en" | "de" }; 

const LanguageContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const languageReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { language: action.payload }; 
    default:
      return state;
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, { language: "en" });

  return <LanguageContext.Provider value={{ state, dispatch }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};