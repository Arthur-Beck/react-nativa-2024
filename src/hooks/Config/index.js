import { createContext, useContext, useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';

const ConfigContext = createContext({});

export function ConfigProvider({ children }) {
  const [directory, setDirectory] = useState("");

  const getDirectory = async () => {
    // console.log("getDirectory: ", FileSystem.documentDirectory);
    const dir = `${FileSystem.documentDirectory}images`;
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    setDirectory(dir);
  }

  useEffect(()=>{
    getDirectory();
  }, [])


  return <ConfigContext.Provider value={{ directory }}>
    {children}
  </ConfigContext.Provider>;
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("useConfig must be used within a ConfigProvider");
  return context;
}