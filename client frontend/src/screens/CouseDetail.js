import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar/NavBar";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { getCourseById } from "../api/courseApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../api/orderApi";
import { userRole } from "../utils/enum";

export default function CouseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState({});

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
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const removeQuotes = (str) => {
    return str.replace(/['"]+/g, "");
  };
  const handleAddCart = (course) => {
    addCourseToCart(id);
  };

  useEffect(() => {
    getCourseById(id).then((res) => {
      setCourse(res.data);
    });
  }, [id]);
  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Grid container mt={1} columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component={"img"}
              src={course?.image}
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
                  {index <= prevPage.length - 1 && (
                    <Typography>{">>"}</Typography>
                  )}
                </>
              ))}
              <Link href="#">{course?.category}</Link>
            </Box>
            <Box display={"flex"} columnGap={1} mb={2}>
              <Typography
                component={Link}
                sx={{
                  color: "red",
                  fontSize: 22,
                  textDecoration: "none",
                  "&:hover": {
                    color: "darkred",
                    textDecoration: "none",
                    cursor: "pointer",
                  },
                }}
              >
                {course?.category?.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: 22 }}>{">>"}</Typography>
              <Typography sx={{ fontSize: 22 }}>{course?.name}</Typography>
            </Box>
            <Typography mb={2} sx={{ fontWeight: "bold", color: "#1A80AD" }}>
              Đầu bếp: {course?.user?.name}
            </Typography>
            <Typography mb={2} sx={{ color: "#FE7613", fontSize: 20 }}>
              {course?.price} VNĐ
            </Typography>
            <Button
              mb={2}
              sx={{
                bgcolor: "red",
                color: "white",
                display: userRole.chef === userInfo?.role ? "block" : "none",
              }}
              color="success"
              variant="contained"
              onClick={() => handleAddCart(course)}
            >
              Chỉnh sửa khóa học
            </Button>

            <Button
              mb={2}
              sx={{
                bgcolor: "red",
                color: "white",
                display: ![userRole.chef, userRole.admin].includes(
                  userInfo?.role
                )
                  ? "block"
                  : "none",
              }}
              color="success"
              variant="contained"
              onClick={() => handleAddCart(course)}
            >
              Mua khóa học
            </Button>
          </Grid>
        </Grid>
        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Mô tả khóa học
        </Typography>
        <Typography mt={2}>{course?.description}</Typography>
        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Nội dung chương trình
        </Typography>

        <Grid
          container
          rowSpacing={2}
          mt={2}
          sx={{ border: 1, borderColor: "gray", borderRadius: 2 }}
        >
          <Grid
            item
            container
            sx={{
              bgcolor: "#B62F2F",
              color: "white",
              borderRadius: 2,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Grid item xs={3} pl={2}>
              <Typography sx={{ fontWeight: "bold" }}>Tên khóa học</Typography>
            </Grid>
            <Grid item container xs={9} pr={2}>
              <Grid item xs={8}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Nội dung chi tiết
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold" }}>Số buổi</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={3} pl={2}>
              <Typography sx={{ fontWeight: "bold" }}>
                {course?.name}
              </Typography>
            </Grid>
            <Grid item container xs={9} pr={2}>
              {course?.foodList?.map((item, index) => (
                <Fragment key={index}>
                  <Grid item xs={8}>
                    <Typography>{item?.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{item?.time}</Typography>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Lợi ích khóa học
        </Typography>
        <Typography mt={2} component={"ul"}>
          {course?.benefit?.map((item, index) => (
            <Typography key={index} component={"li"}>
              {item}
            </Typography>
          ))}
        </Typography>

        <Typography mt={3}>Thời lượng buổi học: {course?.time}</Typography>

        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Đầu bếp
        </Typography>
        <Box
          component={"img"}
          src="https://picsum.photos/200/300"
          width={200}
          height={300}
          sx={{ objectFit: "cover", mx: "50%" }}
          alt={course?.user?.name}
        />

        <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 18 }}>
          Cam kết
        </Typography>
        <Typography mt={2} component={"ul"}>
          {course?.commitment?.map((item, index) => (
            <Typography key={index} component={"li"}>
              {item}
            </Typography>
          ))}
        </Typography>

        <Grid container spacing={3} mt={2}>
          {course?.foodList?.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Box
                component={"img"}
                src={item?.image}
                width={"100%"}
                height={300}
                sx={{ objectFit: "cover", borderRadius: 2 }}
                alt={item?.name}
              />
              <Typography sx={{ textAlign: "center" }}>{item?.name}</Typography>
            </Grid>
          ))}
        </Grid>
        <Box
          name="other-course"
          display={!course?.otherCourse?.length && "none"}
        >
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
                <Typography sx={{ textAlign: "center" }}>
                  Loại món ăn
                </Typography>
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
        </Box>
      </Container>
    </>
  );
}
