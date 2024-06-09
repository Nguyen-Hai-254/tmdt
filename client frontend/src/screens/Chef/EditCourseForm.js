import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { categoriesEnum } from "../../utils/enum";
import { categoriesOptions } from "../../utils/options";
import { useParams } from "react-router-dom";
import { getCourseById, updateCourseByChef } from "../../api/courseApi";

const EditCourseForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      time: "",
      description: "",
      price: null,
      benefit: [""],
      commitment: [""],
      category: "",
    },
  });
  const { fields: benefitFields, append: appendBenefit } = useFieldArray({
    control,
    name: "benefit",
  });

  const { fields: commitmentFields, append: appendCommitment } = useFieldArray({
    control,
    name: "commitment",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        // reset({
        //   ...data,
        //   image: reader.result,
        // });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    updateCourseByChef(id, {
      ...data,
      commitment: data.commitment.filter((item) => item.trim() !== ""),
      benefit: data.benefit.filter((item) => item.trim() !== ""),
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getCourseById(id)
      .then((res) => {
        reset({
          ...res.data,
        });
        setPreviewImage(res.data.image);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  console.log(getValues());

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
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Chỉnh sửa khóa học
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Hãy nhập Tên món ăn" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tên món ăn"
              fullWidth
              margin="normal"
              required
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="imageInput" style={{ display: "block" }}>
          <Button variant="contained" component="span">
            Choose Image
          </Button>
        </label>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: "100%",
              marginTop: 10,
              height: "400px",
              display: "block",
              objectFit: "cover",
            }}
          />
        )}
        <Controller
          name="image"
          control={control}
          rules={{ required: "Hãy tải Ảnh món ăn" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ảnh món ăn"
              fullWidth
              margin="normal"
              error={!!errors.image}
              helperText={errors.image ? errors.image.message : ""}
              value={previewImage}
              sx={{ display: "none" }}
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          rules={{ required: "Hãy nhập Thời lượng buổi học" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Thời lượng buổi học"
              fullWidth
              margin="normal"
              required
              error={!!errors.time}
              helperText={errors.time ? errors.time.message : ""}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: "Hãy nhập Mô tả khóa học" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Mô tả khóa học"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{ required: "Hãy nhập Giá khóa học" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Giá khóa học"
              type="number"
              fullWidth
              margin="normal"
              inputProps={{ min: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">VNĐ</InputAdornment>
                ),
              }}
              required
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""}
            />
          )}
        />

        <Typography variant="h6" gutterBottom mt={1}>
          Lợi ích khóa học
        </Typography>
        {benefitFields.map((item, index) => (
          <Controller
            key={item.id}
            name={`benefit.${index}`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`Lợi ích ${index + 1}`}
                fullWidth
                margin="normal"
                multiline
                maxRows={4}
              />
            )}
          />
        ))}
        <Box textAlign="center">
          <IconButton onClick={() => appendBenefit("")} color="primary">
            <AddIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" gutterBottom mt={1}>
          Cam kết khóa học
        </Typography>
        {commitmentFields.map((item, index) => (
          <Controller
            key={item.id}
            name={`commitment.${index}`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`Cam kết ${index + 1}`}
                fullWidth
                margin="normal"
                multiline
                maxRows={4}
              />
            )}
          />
        ))}
        <Box textAlign="center">
          <IconButton onClick={() => appendCommitment("")} color="primary">
            <AddIcon />
          </IconButton>
        </Box>

        <FormControl fullWidth margin="normal" error={!!errors.category}>
          <InputLabel required>Loại khóa học</InputLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Hãy nhập Loại khóa học" }}
            render={({ field }) => (
              <Select {...field} label="Loại khóa học *" fullWidth>
                {categoriesOptions.map((item, index) => (
                  <MenuItem key={index} value={item?.value}>
                    {item?.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.category && (
            <Typography color="error">{errors.category.message}</Typography>
          )}
        </FormControl>

        <Box textAlign="center" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditCourseForm;
