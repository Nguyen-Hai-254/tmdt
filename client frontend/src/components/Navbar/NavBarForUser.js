import {navbarUser} from "../../utils/nav";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Box, Typography } from "@mui/material";

const NavBarForUser = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px 20px', background: '#000000', pl: '0 !important', pr: '0 !important'}}>
            {navbarUser.map((nav, index) => {
                return (
                    <Link to={nav.url} key={index}>
                        <Typography variant="h5" sx={{ fontFamily: "Josefin Sans", color: '#ffffff', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.25rem' }}>{nav.name}</Typography>
                    </Link>
                )
            })}
        </Box >
    )
}

export default NavBarForUser;