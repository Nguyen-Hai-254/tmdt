import { Link } from "react-router-dom/cjs/react-router-dom"
import { Box, Typography } from "@mui/material"


const NavBarForChef = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0', background: '#fff', pl: '0 !important', pr: '0 !important' }}>
            <Link to='/'>
                <Typography variant="h5" sx={{ color: '#737373' }}>Trang chủ</Typography>
            </Link>
            <Link to='/chef'>
                <Typography variant="h5" sx={{ color: '#737373' }}>Khóa học của tôi</Typography>
            </Link>
            <Link to='/'>
                <Typography variant="h5" sx={{ color: '#737373' }}>Đăng khóa học</Typography>
            </Link>
            <Link to='/food-register'>
                <Typography variant="h5" sx={{ color: '#737373' }}>Đăng món ăn</Typography>
            </Link>
        </Box>
    )
}

export default NavBarForChef;