import { Typography } from "@mui/material"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("oauthservice");
        sessionStorage.removeItem("userid");
    })

    return (
        <Typography>
            Pomyślnie wylogowano. Następuje przekierowanie...
            {
                setTimeout(() => {
                    navigate("/");
                }, 1000)
            }
        </Typography>
    )
}

export default Logout;