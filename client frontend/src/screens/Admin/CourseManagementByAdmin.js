import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import Header from "../../components/Header"
import NavBarForAdminOrChef from "../../components/Navbar/NavBarForAdminOrChef"
import { useEffect, useState } from "react";
import { getAllCourseByAdmin } from "../../api/AdminApi";
import DeleteIcon from '@mui/icons-material/Delete';
// import { DataGrid } from '@mui/x-data-grid';


const CourseManagementByAdmin = () => {
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [page, setPage] = useState(0);

    const [rows, setRows] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getAllCourseByAdmin();
                setRows(res.data)
                console.log(rows)
            } catch (e) {
                console.log(e.message)
            }
        }

        fetchApi()
    }, [rowsPerPage, page])

    const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Container sx={{ maxWidth: '100% !important', padding: '0 !important' }}>
            <Header />
            <NavBarForAdminOrChef role='Admin' />
            <Typography variant="h3" sx={{ width: '80%', margin: '30px auto' }}>Danh sách khóa học</Typography>
            <TableContainer component={Paper} sx={{ width: '80%', margin: '30px auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Tên khóa học</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Loại khóa học</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Tên đầu bếp</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ngày đăng</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Lượt xem</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">{index + 1 + rowsPerPage * page}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.category}</TableCell>
                                <TableCell align="left">{row.user.name}</TableCell>
                                <TableCell align="center">{row.createdAt}</TableCell>
                                <TableCell align="center">{row.view}</TableCell>
                                <TableCell align="center">{row.active ? 'Đã duyệt' : 'Chờ duyệt'}</TableCell>
                                <TableCell align="center"><DeleteIcon sx={{ color: 'red' }} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>


        </Container>
    )
}

export default CourseManagementByAdmin;