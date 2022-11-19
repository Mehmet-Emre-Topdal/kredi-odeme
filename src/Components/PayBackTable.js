import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/app-context";
import ModalContext from "../store/dialog-context";

const PayBackTable = () => {
  const [plan, setPlan] = useState([]);
  const [totals, setTotals] = useState({ totalPayment: 0, totalTax: 0 });

  const ctx = useContext(AppContext);
  const modalContext = useContext(ModalContext);

  const calculateSimpleInterest = (
    principal,
    rate,
    time,
    timeInterval = "monthly"
  ) => {
    rate = rate / 100;
    if (timeInterval === "annual") time = time * 360;
    if (timeInterval === "monthly") time = time * 30;

    return (principal * rate * time) / 30;
  };

  const calculateCompoundInterest = (
    principal,
    rate,
    time,
    timeInterval
  ) => {
    rate = rate / 100;
    if (timeInterval === "annual") time = time * 360;
    if (timeInterval === "monthly") time = time * 30;

    return principal * Math.pow(1 + rate, time / 30);
  };


  useEffect(() => {
    let { loanAmount } = ctx.data;
    const { profitRate, numOfInstallments, kkdfRate, bsmvRate, installmentInterval } = ctx.data;

    let totalTax = 0;
    const arr = [];

    const totalPayment = calculateCompoundInterest(loanAmount,profitRate,numOfInstallments,installmentInterval);
    const installment = (totalPayment / numOfInstallments).toFixed(2);

    for (let i = 0; i < numOfInstallments; i++) {

      const profit = calculateSimpleInterest(loanAmount, profitRate, 1, installmentInterval).toFixed(
        2
      );
      const kkdf = +((profit * kkdfRate) / 100).toFixed(2);
      const bsmv = +((profit * bsmvRate) / 100).toFixed(2);
      const principal = (installment - profit - kkdf - bsmv).toFixed(2);
      loanAmount = (loanAmount - principal).toFixed(2);

      totalTax = totalTax + kkdf + bsmv;

      arr.push({
        monthNo: i + 1,
        installment: installment,
        principal: principal,
        profit: profit,
        kkdf: kkdf,
        bsmv: bsmv,
        loanAmount: loanAmount,
      });
    }

    setPlan([...arr]);
    setTotals({ totalTax: totalTax, totalPayment: totalPayment });
  }, [modalContext.open]);

  return (
    <Card sx={{ p: 2 }}>
      <TableContainer component={Paper} sx={{maxHeight:"60vh"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Taksit No</TableCell>
              <TableCell align="right">Taksit Tutarı</TableCell>
              <TableCell align="right">Ana Para</TableCell>
              <TableCell align="right">Kalan Ana Para</TableCell>
              <TableCell align="right">Kar Tutarı</TableCell>
              <TableCell align="right">KKDF</TableCell>
              <TableCell align="right">BSMV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plan.map((value) => {
              return (
                <TableRow
                  key={value.monthNo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {value.monthNo}
                  </TableCell>
                  <TableCell align="right">{value.installment}</TableCell>
                  <TableCell align="right">{value.principal}</TableCell>
                  <TableCell align="right">{value.loanAmount}</TableCell>
                  <TableCell align="right">{value.profit}</TableCell>
                  <TableCell align="right">{value.kkdf}</TableCell>
                  <TableCell align="right">{value.bsmv}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

      

        </Table>
        
      </TableContainer>
<Card sx={{p:1.5, mt:2}}>
            <Typography >
              Toplam ödeme tutarı:
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", ml: 0.5, display: "inline-block" }}
              >
                {totals.totalPayment.toFixed(2)}
              </Typography>
            </Typography>
            <Typography >
              Toplam vergi tutarı:
              <Typography
                variant="span"
                sx={{ fontWeight: "bold", ml: 0.5, display: "inline-block" }}
              >
                {totals.totalTax.toFixed(2)}
              </Typography>
            </Typography>
            </Card>

    </Card>
  );
};

export default PayBackTable;
