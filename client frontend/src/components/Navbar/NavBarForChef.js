import { Link } from "react-router-dom/cjs/react-router-dom"
import { Box, Typography } from "@mui/material"


const NavBarForChef = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0', background: '#D9D9D9', pl: '0 !important', pr: '0 !important' }}>
            <Link to='/'>
                <Typography variant="h5" sx={{ color: '#000', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.25rem' }}>Trang chủ</Typography>
            </Link>
            <Link to='/chef'>
                <Typography variant="h5" sx={{ color: '#000', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.25rem' }}>Khóa học của tôi</Typography>
            </Link>
            <Link to='/food-course-register'>
                <Typography variant="h5" sx={{ color: '#000', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.25rem' }}>Đăng khóa học</Typography>
            </Link>
            <Link to='/food-register'>
                <Typography variant="h5" sx={{ color: '#000', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.25rem' }}>Đăng món ăn</Typography>
            </Link>
        </Box>
    )
}

export default NavBarForChef;