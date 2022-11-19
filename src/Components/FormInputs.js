import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const FormInputs = forwardRef(function FormInputs(props, ref) {
  const initialValues = {
    loanAmount: "",
    profitRate: "",
    installmentInterval: "",
    numOfInstallments: "",
    bsmvRate: "5",
    kkdfRate: "15",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (values.loanAmount === "") {
      errors.loanAmount = "Bu alan boş bırakılamaz";
    } else if (+values.loanAmount <= 0) {
      errors.loanAmount = "Lütfen sıfırdan büyük bir değer giriniz";
    }

    if (values.profitRate === "") {
      errors.profitRate = "Bu alan boş bırakılamaz";
    } else if (+values.profitRate <= 0) {
      errors.profitRate = "Lütfen sıfırdan büyük bir değer giriniz";
    }

    if (values.installmentInterval === "") {
      errors.installmentInterval = "Lütfen taksit aralığı seçiniz";
    }

    if (values.numOfInstallments === "") {
      errors.numOfInstallments = "Bu alan boş bırakılamaz";
    } else if (+values.numOfInstallments <= 0) {
      errors.numOfInstallments = "Lütfen sıfırdan büyük bir değer giriniz";
    }

    if (values.bsmvRate === "") {
      errors.bsmvRate = "Bu alan boş bırakılamaz";
    } else if (+values.bsmvRate < 0) {
      errors.bsmvRate = "Lütfen sıfır veya sıfırdan büyük bir değer giriniz";
    }

    if (values.kkdfRate === "") {
      errors.kkdfRate = "Bu alan boş bırakılamaz";
    } else if (+values.kkdfRate < 0) {
      errors.kkdfRate = "Lütfen sıfır veya sıfırdan büyük bir değer giriniz";
    }

    setFormErrors({ ...errors });
    return { ...errors };
  };

  const clear = () => {
    setFormValues(initialValues);

    setFormErrors({});
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getFormValues: () => {
          return formValues;
        },
        getFormErrors: () => {
          return formErrors;
        },

        validateInputs: () => validate(formValues),
        clearInputs: () => clear(),
      };
    },
    [formValues, formErrors]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Kredi Ödeme Hesaplama</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          name="loanAmount"
          label="Kredi Tutarı"
          type="number"
          fullWidth
          variant="standard"
          onChange={onChangeHandler}
          value={formValues.loanAmount}
        />
        <Typography color="secondary">{formErrors.loanAmount}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="profitRate"
          label="Kar Oranı"
          type="number"
          fullWidth
          variant="standard"
          onChange={onChangeHandler}
          value={formValues.profitRate}
        />
        <Typography color="secondary">{formErrors.profitRate}</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl sx={{ minWidth: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Taksit Aralığı
          </InputLabel>
          <Select
            labelId="installment-interval"
            name="installmentInterval"
            label="taksit-araligi"
            onChange={onChangeHandler}
            defaultValue=""
            value={formValues.installmentInterval}
          >
            <MenuItem value={"monthly"} name="installmentInterval">
              Aylık
            </MenuItem>
            <MenuItem value={"anual"} name="installmentInterval">
              Yıllık
            </MenuItem>
            <MenuItem value={"daily"} name="installmentInterval">
              Günlük
            </MenuItem>
          </Select>
        </FormControl>
        <Typography color="secondary">
          {formErrors.installmentInterval}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="numOfInstallments"
          label="Taksit Sayısı"
          type="number"
          fullWidth
          variant="standard"
          onChange={onChangeHandler}
          value={formValues.numOfInstallments}
        />

        <Typography color="secondary">
          {formErrors.numOfInstallments}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="bsmvRate"
          label="BSMV"
          type="number"
          fullWidth
          variant="standard"
          onChange={onChangeHandler}
          value={formValues.bsmvRate}
        />
        <Typography color="secondary">{formErrors.bsmvRate}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="kkdfRate"
          label="KKDF"
          type="number"
          fullWidth
          variant="standard"
          onChange={onChangeHandler}
          value={formValues.kkdfRate}
        />
        <Typography color="secondary">{formErrors.kkdfRate}</Typography>
      </Grid>
    </Grid>
  );
});

export default FormInputs;
