"use client";

import React, { createContext, ReactNode } from "react";
import en from "../locales/en.json";

export type Translations = typeof en;

export const TranslationsContext = createContext<Translations>(en);

interface LocaleProviderProps {
  value: Translations;
  children: ReactNode;
}

export function LocaleProvider({ value, children }: LocaleProviderProps) {
  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}
