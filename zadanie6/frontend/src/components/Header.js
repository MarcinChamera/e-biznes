import React, { useContext } from "react";
import { AppBar, Box, IconButton, Link, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoggedInContext } from "../context/LoggedInContext";

const Header = () => {
    const { isLoggedIn } = useContext(LoggedInContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography sx={{ mr: 2 }}>
                        <Link className="shopName" sx={{color:"white"}} href="/products">
                            Nameless Shop
                        </Link>
                    </Typography>
                    <div>
                        <IconButton className="cartButton" aria-label="add to shopping cart" href="/shopping-cart" sx={{ mr: 2 }}>
                            <ShoppingCartIcon/>
                        </IconButton>
                    </div>
                    <Typography>
                        {!isLoggedIn ?
                            (<Link className="loginLink" sx={{color:"black"}} href="/login">
                                Login
                            </Link>) :
                            (<Link className="logoutLink" sx={{color:"black"}} href="/logout">
                                Logout
                            </Link>)
                        }
                    </Typography>
                    <Typography className="emailLoggedIn" marginLeft={5}>
                        {isLoggedIn ? 
                        ("Konto: " + sessionStorage.getItem('email')) + " (serwis: " + sessionStorage.getItem("oauthservice") + ")" : 
                        ("")}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;