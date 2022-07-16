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
        const userIdValue = parseInt(sessionStorage.getItem("userid"));
        const tokenValue = sessionStorage.getItem("token");
        const emailValue = sessionStorage.getItem("email");
        const oAuthServiceValue = sessionStorage.getItem("oauthservice");
        alert("Płatność udana!")
        axios.post("/order", {paymentNumber, userIdValue});
        sessionStorage.clear();
        if (tokenValue !== null) {
            sessionStorage.setItem("token", tokenValue);
        }
        if (emailValue !== null) {
            sessionStorage.setItem("email", emailValue);
        }
        if (oAuthServiceValue !== null) {
            sessionStorage.setItem("oauthservice", oAuthServiceValue);
        }
        if (userIdValue !== null) {
            sessionStorage.setItem("userid", userIdValue.toString());
        }
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