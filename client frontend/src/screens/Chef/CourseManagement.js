import { Box, Button, Container, Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const CourseManagement = () => {
    return (
        <Container>
            <Box sx={{ width: '80%' }}>
                <Box>
                    <Typography variant="h3">Các khóa học đã đăng</Typography>
                    <Typography variant="body2" sx={{ mt: 2, color: '#737373' }}>Tham khảo và tìm hiểu các khoá học phổ biến để đánh giá, nắm bắt nhu cầu học viên.</Typography>
                    <Typography variant="body2" sx={{ color: '#737373' }}>Hoặc bạn cũng có thể tự trải nghiệm chúng</Typography>
                </Box>
            </Box>

            <Box sx={{ width: '80%', mt: 5 }}>
                <Box sx={{ width: '50%', display: 'flex' }}>
                    <Box
                        component="img"
                        sx={{
                            height: '450px',
                            width: '30%',
                            objectFit: 'cover'
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="The house from the offer."
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h5" sx={{ color: '#FD2357', mt: 2 }}>Món ăn ba miền</Typography>
                        <Typography variant="h4" sx={{}}>Món ăn ngày tết</Typography>
                        <Typography variant="h6" sx={{ color: '#737373' }}>Những món ngon ngày Tết mà bạn cần phải biết, dễ chế biến</Typography>
                        <Typography variant="h4" sx={{ color: '#BDBDBD', mt: 4 }}>500.000 VNĐ</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ color: '#FD2357' }} />
                                <Typography variant="h6" sx={{ ml: 1, color: '#737373' }}>22 buổi</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <MenuBookIcon sx={{ color: '#FD2357' }} />
                                <Typography variant="h6" sx={{ ml: 1, color: '#737373' }}>10 món ăn</Typography>
                            </Box>
                        </Box>

                        <Button variant="outlined" sx={{ color: '#FD2357', borderColor: '#23A6F0', borderRadius: '37px', fontWeight: 'bold', margin: 'auto auto 15px auto' }}>
                            Chi tiết
                            <KeyboardArrowRightIcon sx={{ color: '#23A6F0' }} />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default CourseManagement;