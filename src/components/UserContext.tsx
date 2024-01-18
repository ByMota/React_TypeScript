import React, { PropsWithChildren, createContext } from "react";
import { useFetch } from "./useFetch";

interface User {
  id: number;
  nome: string;
  aulas: number;
  cursos: number;
  preferencias: {
    playback: number;
    volume: number;
    qualidade: 'baixa' | 'media' | 'alta';
  }
}

interface IUserContext {
  data: User | null;
  loading: boolean;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext)
  if(context === null ) throw new Error("useContext deve estar dentro do Provider")
  return context
}

export const UserContextProvider = ({children}: PropsWithChildren) => {
  const {data, loading} =  useFetch<User>('https://data.origamid.dev/usuarios/1')

  return (
    <UserContext.Provider
      value={{
        data,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}