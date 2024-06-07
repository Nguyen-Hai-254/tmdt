import { Container } from "@mui/material"
import Header from "../../components/Header"
import NavBarForAdminOrChef from "../../components/Navbar/NavBarForAdminOrChef"


const CourseManagementByAdmin = () => {
    return (
        <Container sx={{ maxWidth: '100% !important', padding: '0 !important' }}>
            <Header />
            <NavBarForAdminOrChef role='Admin' />

        </Container>
    )
}

export default CourseManagementByAdmin;