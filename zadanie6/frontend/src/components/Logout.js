import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/General.css"

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("oauthservice");
        sessionStorage.removeItem("userid");
    })

    return (
        <Container className="container" >
            <Typography variant="h4">
                Pomyślnie wylogowano. Następuje przekierowanie...
                {
                    setTimeout(() => {
                        navigate("/");
                    }, 1000)
                }
            </Typography>
        </Container>
    )
}

export default Logout;