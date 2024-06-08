import React, { useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar/NavBar";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getCourseById } from "../api/courseApi";
import { useNavigate } from "react-router";

const prevPage = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Khóa học nấu ăn",
    link: "/",
  },
];

export default function CouseDetail() {
  useEffect(() => {
    getCourseById(1);
  }, []);
  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Grid container mt={1} columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component={"img"}
              src="https://source.unsplash.com/random"
              alt=""
              width="100%"
              height={339}
              sx={{ objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display={"flex"} columnGap={1} mb={2}>
              {prevPage.map((page, index) => (
                <>
                  <Link key={index} href={page.link}>
                    {page.name}
                  </Link>
                  {index <= prevPage.length - 2 && (
                    <Typography>{">>"}</Typography>
                  )}
                </>
              ))}
            </Box>
            <Box display={"flex"} columnGap={1} mb={2}>
              <Typography sx={{ color: "red", fontSize: 22 }}>
                {prevPage[prevPage.length - 1].name.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: 22 }}>{">>"}</Typography>
              <Typography sx={{ fontSize: 22 }}>Course Title</Typography>
            </Box>
            <Typography mb={2} sx={{ fontWeight: "bold", color: "#1A80AD" }}>
              Đầu bếp: AAA
            </Typography>
            <Typography mb={2} sx={{ color: "#FE7613", fontSize: 20 }}>
              20000 VND
            </Typography>
            <Button
              mb={2}
              sx={{ bgcolor: "red", color: "white" }}
              color="success"
              variant="contained"
            >
              Mua khóa học
            </Button>
          </Grid>
        </Grid>
        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Mô tả khóa học
        </Typography>
        <Typography mt={2}>
          Khóa học “Đặc sản đồng quê” dành cho các bạn đã biết nấu ăn cơ bản.
        </Typography>
        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Nội dung chương trình
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên khóa học</TableCell>
              <TableCell>Chuyên đề</TableCell>
              <TableCell>Nội dung chi tiết</TableCell>
              <TableCell>Số buổi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={2}>Data 1</TableCell>
              <TableCell>Món ăn miền Bắc</TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </TableCell>
              <TableCell>1 buoi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Món ăn miền Bắc</TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </TableCell>
              <TableCell>1 buoi</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Lợi ích khóa học
        </Typography>
        <Typography mt={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
        <Typography mt={3}>Thời lượng buổi học: </Typography>

        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Đầu bếp
        </Typography>
        <Box
          component={"img"}
          src="https://picsum.photos/200/300"
          width={200}
          height={300}
          sx={{ objectFit: "cover", mx: "50%" }}
        />

        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Cam kết
        </Typography>
        <Typography mt={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Box
                component={"img"}
                src="https://picsum.photos/200/300"
                width={"100%"}
                height={300}
                sx={{ objectFit: "cover" }}
              />
              <Typography sx={{ textAlign: "center" }}>Tên món ăn</Typography>
            </Grid>
          ))}
        </Grid>
        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Khóa học tham khảo
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Box
                component={"img"}
                src="https://picsum.photos/200/300"
                width={"100%"}
                height={300}
                sx={{ objectFit: "cover" }}
              />
              <Typography sx={{ textAlign: "center" }}>Loại món ăn</Typography>
              <Typography sx={{ textAlign: "center", color: "#FE7613" }}>
                Giá VND
              </Typography>
              <Button
                sx={{ mx: "auto", bgcolor: "red" }}
                color="success"
                variant="contained"
              >
                Mua khóa học
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
