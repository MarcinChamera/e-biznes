import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/General.css"

const LoginSuccess = () => {
    const navigate = useNavigate();
    const { oauthservice, token, email, userid } = useParams();
    
    useEffect(() => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("oauthservice", oauthservice);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("userid", userid);
    })

    return (
        <Container className="container" >
            <Typography variant="h4">
                Pomyślnie zalogowano. Następuje przekierowanie...
                {
                    setTimeout(() => {
                        navigate("/");
                    }, 1000)
                }
            </Typography>
        </Container>
    )
}

export default LoginSuccess;