import {navbarUser} from "../../utils/nav";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { useRef, useEffect, useState } from "react";

const NavBarForUser = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [menuWidth, setMenuWidth] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            setMenuWidth(ref.current.offsetWidth);
        }
    }, []);

    const handleMouseEnter = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndex(index);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setSelectedIndex(null);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px 20px', background: '#000000', pl: '0 !important', pr: '0 !important'}}>
            {navbarUser.map((nav, index) => {
                return (
                    <div key={index} onMouseEnter={(event) => handleMouseEnter(event, index)} onMouseLeave={handleMouseLeave}>
                        <Typography variant="h5"
                            ref={ref} 
                            sx={{ 
                                fontFamily: "Josefin Sans", 
                                color: '#ffffff', 
                                textTransform: 'uppercase', 
                                fontWeight: 'bold', 
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#ff0000',  // Thay đổi màu sắc này theo yêu cầu của bạn
                                },
                            }}
                        >
                            {nav.name}
                        </Typography>
                        {nav.subMenu && selectedIndex === index && (
    <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        // sx={{ minWidth: 'fit-content' }}
        sx={{ minWidth: `${menuWidth}px` }}
    >
        {nav.subMenu.map((subItem, subIndex) => (
            <MenuItem 
                onClick={handleMouseLeave} 
                key={subIndex}
                sx={{ 
                    fontFamily: "Josefin Sans", 
                    color: '#ffffff', 
                    textTransform: 'uppercase', 
                    fontWeight: 'bold', 
                    fontSize: '1.25rem' 
                }}
            >
                <Link to={subItem.url}>{subItem.name}</Link>
            </MenuItem>
        ))}
    </Menu>
)}
                    </div>
                )
            })}
        </Box >
    )
}

export default NavBarForUser;