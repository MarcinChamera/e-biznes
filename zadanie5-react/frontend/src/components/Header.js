import React from "react";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {

    return (
        <header>
            <AppBar>
                <Toolbar>
                    <Typography>
                        <Link sx={{color:"white"}} href="/products">
                            Nameless Shop
                        </Link>
                    </Typography>
                    <div>
                        <IconButton aria-label="add to shopping cart" href="/shopping-cart">
                            <ShoppingCartIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header;