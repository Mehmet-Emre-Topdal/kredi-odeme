import React, { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [data, setData] = useState({
    loanAmount: "",
    profitRate: "",
    installmentInterval: "",
    numOfInstallments: "",
    bsmvRate: "",
    kkdfRate: "",
  });

  return (
    <AppContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
