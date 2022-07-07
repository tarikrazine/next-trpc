import React, { createContext, useContext } from "react";

import { inferProcedureOutput } from "@trpc/server";

import { AppRouter } from "../server/router/app.router";

type TQuery = keyof AppRouter['_def']['queries']

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

const userContext = createContext<InferQueryOutput<'users.me'>>(null)

function UserContextProvider({ children, value }: { children: React.ReactNode, value: InferQueryOutput<'users.me'> | undefined }) {
    return (
        <userContext.Provider value={value || null}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => useContext(userContext)

export { UserContextProvider, useUserContext }