import { Typography } from "@mui/material"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        <Typography>
            Pomyślnie zalogowano. Następuje przekierowanie...
            {
                setTimeout(() => {
                    navigate("/");
                }, 1000)
            }
        </Typography>
    )
}

export default LoginSuccess;