import React, { createContext, useContext, type ReactNode } from "react";
import { useHome } from "../useHome";

export type Model = ReturnType<typeof useHome>;

const HomeContext = createContext<Model | null>(null);

export const useContextHome = () => {
  const context = useContext(HomeContext);
  if (context === null) {
    throw new Error(
      "useContextHome must be used within a ContextHomeProvider"
    );
  }
  return context;
};

export const ContextHomeProvider = ({
  methods,
  children,
}: {
  methods: Model;
  children: ReactNode;
}) => {
  return (
    <HomeContext.Provider value={methods}>
      {children}
    </HomeContext.Provider>
  );
};
