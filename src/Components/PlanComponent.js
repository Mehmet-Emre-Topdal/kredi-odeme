import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import ModalContext from "../store/dialog-context";
import PayBackTable from "./PayBackTable";

const PlanComponent = () => {

    const ModalCtx = useContext(ModalContext)

    const onCloseHandler = () => {
        ModalCtx.setOpen(false)
    }

    return (
        <Dialog open={ModalCtx.open} onClose={onCloseHandler} maxWidth="md">
            <DialogTitle id="description" color="primary" fontSize={"25px"}>
                Geri Ödeme Planınız
            </DialogTitle>

            <DialogContent>
                <PayBackTable></PayBackTable>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCloseHandler}>kapat</Button>
            </DialogActions>


        </Dialog>
    );
}

export default PlanComponent;