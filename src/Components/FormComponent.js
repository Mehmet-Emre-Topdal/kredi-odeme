import {
  Button,
  Card,
  Grid,

} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRef, useContext } from "react";
import AppContext from "../store/app-context";
import ModalContext from "../store/dialog-context";
import FormInputs from "./FormInputs";
import Info from "./Info";

export default function FormComponent() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const ModalCtx = useContext(ModalContext)
  const ctx = useContext(AppContext);

  const inputsRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setFormErrors(inputsRef.current.validateInputs());

    setIsSubmit(true);
  };

  useEffect(() => {
    const formInputs = inputsRef.current.getFormValues();


    if (Object.keys(formErrors).length === 0 && isSubmit === true) {

        ctx.setData({...formInputs})

        //inputsRef.current.clearInputs(); modal açtıktan sonra opsiyonel olarak inputlar temizlenebilir

        setIsSubmit(false);

        ModalCtx.setOpen(true)
    }
  }, [formErrors]);

  return (
    <Card sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <form onSubmit={onSubmitHandler}>
            <FormInputs ref={inputsRef}></FormInputs>

            <Button type="submit" variant="contained" sx={{mt:3, mb:2}}>
              hesapla
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Info />
        </Grid>
      </Grid>
    </Card>
  );
}
