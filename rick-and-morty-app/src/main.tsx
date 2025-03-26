import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { LanguageProvider } from "./translations/LanguageContext";
import client from "./graphql/apolloClient";
import CharacterList from "./components/character/CharacterList";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./index.css";


const AppContent = () => {
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(true);

  return (
    <>
      <Header
        isInfiniteScroll={isInfiniteScroll}
        toggleScrollMode={() => setIsInfiniteScroll(!isInfiniteScroll)}
      />
      <CharacterList isInfiniteScroll={isInfiniteScroll} />
      <Footer />
    </>
  );
};


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ApolloProvider>
  </StrictMode>
);