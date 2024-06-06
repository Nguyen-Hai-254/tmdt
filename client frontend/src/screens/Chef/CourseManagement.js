import { Box, Container, Typography } from "@mui/material"


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
                </Box>
            </Box>
        </Container>
    )
}

export default CourseManagement;