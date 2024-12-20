"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface RPCContextType {
  rpcUrl: string;
  setRpcUrl: (url: string) => void;
}

const RPCContext = createContext<RPCContextType | undefined>(undefined);

export function RPCProvider({ children }: { children: ReactNode }) {
  const [rpcUrl, setRpcUrl] = useState<string>("http://10.8.6.153:2510");

  return (
    <RPCContext.Provider value={{ rpcUrl, setRpcUrl }}>
      {children}
    </RPCContext.Provider>
  );
}

export function useRPC() {
  const context = useContext(RPCContext);
  if (context === undefined) {
    throw new Error('useRPC must be used within a RPCProvider');
  }
  return context;
} 