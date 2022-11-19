
import React, { useRef } from "react";
import "./App.css";
import FormComponent from "./Components/FormComponent";
import PlanComponent from "./Components/PlanComponent";
import { AppContextProvider } from "./store/app-context";
import { ModalContextProvider } from "./store/dialog-context";

function App() {

  const dialogRef = useRef()

  return (
    <AppContextProvider>
      <ModalContextProvider>

        <FormComponent />
        <PlanComponent />
      </ModalContextProvider>
    </AppContextProvider>
  );
}

export default App;
