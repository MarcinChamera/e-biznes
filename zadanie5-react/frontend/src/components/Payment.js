import { useLocation, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { Typography, Button, TextField, Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import axios from "../axios/axios";

const defaultValues = {
    name: "",
    cardNumber: "",
    expireDate: "",
    cvv: "",
  };

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [ amountToPay ] = useState(location.state?.amountToPay);
    const [ paymentNumber ] = useState(location.state?.paymentNumber);
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const pay = (event) => {
        alert("Płatność udana!")
        axios.post("/order", {paymentNumber}).then(() => {
            window.localStorage.clear();
        });
        event.preventDefault();
        navigate("/products");
    }

    return (
        <form onSubmit={pay}>
            <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
                <Typography variant="h4" marginTop={15}>
                    Do zapłacenia: {amountToPay} PLN
                </Typography>
                <Grid item>
                <TextField
                    id="name-input"
                    name="name"
                    label="Imię i nazwisko"
                    type="text"
                    required
                    fullWidth
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item>
                <TextField
                    id="cardNumber-input"
                    name="cardNumber"
                    label="Nr karty"
                    type="text"
                    required
                    value={formValues.cardNumber}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item>
                <TextField
                    id="expireDate-input"
                    name="expireDate"
                    label="Data ważności"
                    type="text"
                    required
                    value={formValues.expireDate}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item>
                <TextField
                    id="cvv-input"
                    name="cvv"
                    label="CVV"
                    type="text"
                    required
                    value={formValues.cvv}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item>
                    <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    type="submit"
                    >
                    Zapłać
                </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Payment;