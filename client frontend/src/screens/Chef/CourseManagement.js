import { Box, Button, Container, Grid, Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from "react";
import { getAllCourseByChef } from "../../api/ChefApi";
import { formatStringByThree } from "../../utils/convert";
import NavBarForChef from "../../components/Navbar/NavBarForChef";


const CourseManagement = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getAllCourseByChef();
                setData(res.data)
                console.log(data[0])
            } catch (e) {
                console.log(e.error)
            }
        }

        fetchApi();
    }, [])

    return (
        <Container sx={{ backgroundColor: '#FBCFCF', maxWidth: '100% !important', padding: '0 !important' }}>
            <NavBarForChef />
            <Container >
                <Box sx={{ width: '80%' }}>
                    <Box sx={{ mt: 7 }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Các khóa học đã đăng</Typography>
                        <Typography variant="body2" sx={{ mt: 2, color: '#737373', fontStyle: 'italic' }}>Tham khảo và tìm hiểu các khoá học phổ biến để đánh giá, nắm bắt nhu cầu học viên.</Typography>
                        <Typography variant="body2" sx={{ color: '#737373', fontStyle: 'italic' }}>Hoặc bạn cũng có thể tự trải nghiệm chúng</Typography>
                    </Box>
                </Box>

                <Grid container spacing={2} sx={{ width: '90%', mt: 5, background: '#fff' }}>
                    {data && data.length > 0 && data.map((course, index) => {
                        return (
                            <Grid item key={index} xs={6} sx={{ display: 'flex', pr: 2 }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '450px',
                                        width: '40%',
                                        objectFit: 'cover'
                                    }}
                                    alt="The house from the offer."
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                                />
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="h5" sx={{ color: '#FD2357', mt: 2 }}>{course.category}</Typography>
                                    <Typography variant="h4" sx={{ minHeight: '85px' }}>{course.name}</Typography>
                                    <Typography variant="h6" sx={{ color: '#737373', minHeight: '100px' }}>{course.description.length > 80 ? course.description.slice(0, 80) + '...' : course.description}</Typography>
                                    <Typography variant="h4" sx={{ color: '#BDBDBD', mt: 3 }}>{formatStringByThree(course.price)} VNĐ</Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <AccessTimeIcon sx={{ color: '#FD2357' }} />
                                            <Typography variant="h6" sx={{ ml: 1, color: '#737373' }}>{course.time}</Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <MenuBookIcon sx={{ color: '#FD2357' }} />
                                            <Typography variant="h6" sx={{ ml: 1, color: '#737373' }}>{course.foodList.length} món ăn</Typography>
                                        </Box>
                                    </Box>

                                    <Button variant="outlined" sx={{ color: '#FD2357', borderColor: '#23A6F0', borderRadius: '37px', fontWeight: 'bold', margin: '50px auto' }}>
                                        Chi tiết
                                        <KeyboardArrowRightIcon sx={{ color: '#23A6F0' }} />
                                    </Button>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Container>

    )
}

export default CourseManagement;