import React, { useEffect, useState } from "react";
import { getCart } from "../api/orderApi";
import { getCourseById } from "../api/courseApi";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NavBarForUser from "../components/Navbar/NavBarForUser";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

export default function PaidCourseDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getCourseById(id)
      .then((res) => {
        setCourse(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  return (
    <>
      <Header />
      <NavBarForUser />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          {course?.name}
        </Typography>
        <Box
          component={"img"}
          src={course?.image}
          alt={course?.name}
          width="100%"
          maxHeight="300px"
          sx={{ objectFit: "cover", my: 3 }}
        />
        {course?.foodList?.map((food, index) => (
          <Box
            key={food?._id}
            sx={{ my: 1, display: "flex", flexDirection: "column", rowGap: 2 }}
          >
            <Typography variant="h6" fontWeight={700}>
              Món ăn thứ {index + 1}: {food?.name}
            </Typography>
            <Typography>{food?.description}</Typography>
            <Box
              component={"img"}
              src={food?.image}
              alt={food?.name}
              width="80%"
              maxHeight="300px"
              sx={{ objectFit: "cover", mx: "auto" }}
            />
            <Typography>
              <b>Thời gian thực hiện:</b> {food?.time}
            </Typography>
            <Typography fontWeight={700}>Nguyên liệu:</Typography>
            {food?.ingredient?.map((lst) => (
              <Box>
                {lst?.split("\n").map((item, index) => (
                  <ul key={index}>
                    <li>{item?.replace("", "")}</li>
                  </ul>
                ))}
              </Box>
            ))}
            <Typography fontWeight={700}>Chuẩn bị:</Typography>
            {food?.processing?.map((lst) => (
              <Box>
                {lst?.split("\no").map((item, index) => (
                  <ul key={index}>
                    <li>{item?.replace("o\t", "\t")}</li>
                  </ul>
                ))}
              </Box>
            ))}
            <Typography fontWeight={700}>Hướng dẫn thực hiện:</Typography>
            {food?.make?.map((lst) => (
              <Box>
                {lst?.split("\no").map((item, index) => (
                  <ul key={index}>
                    <li>{item?.replace("o\t", "\t")}</li>
                  </ul>
                ))}
              </Box>
            ))}
          </Box>
        ))}

        <Typography
          variant="h4"
          fontWeight={700}
          color={"red"}
          textAlign={"center"}
          p={2}
        >
          Chúc mừng bạn đã hoàn thành khóa học!
        </Typography>
      </Container>
    </>
  );
}
