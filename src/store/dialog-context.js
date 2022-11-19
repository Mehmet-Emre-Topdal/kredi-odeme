import React, { useState } from "react";
import { createContext } from "react";

const ModalContext = createContext();

export const ModalContextProvider = (props) => {

    const [open, setOpen] = useState(false);

    return(
        <ModalContext.Provider value={{
            open: open,
            setOpen: setOpen
        }}>
            {props.children}
        </ModalContext.Provider>
    )

}

export default ModalContext;