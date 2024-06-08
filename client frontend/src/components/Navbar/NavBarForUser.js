import navbarUser from "../../utils/nav";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Box, Typography } from "@mui/material";

const NavBarForUser = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0', background: '#D9D9D9', pl: '0 !important', pr: '0 !important' }}>
            {navbarUser.map((nav, index) => {
                return (
                    <Link to={nav.url} key={index}>
                        <Typography variant="h5" sx={{ color: '#000', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.25rem' }}>{nav.name}</Typography>
                    </Link>
                )
            })}
        </Box >
    )
}

export default NavBarForUser;