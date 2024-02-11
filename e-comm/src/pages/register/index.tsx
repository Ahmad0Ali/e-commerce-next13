import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface handleRegisterProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}

const validationSchema = yup.object({
  name: yup.string().min(3, "Enter a valid name").required("name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phone: yup
    .string()
    .matches(/^01[0125][0-9]{8}$/, "phone must be egypt number...")
    .required("phone is required"),

  password: yup
    .string()
    .matches(/^[A-Z][a-z0-9]{5,10}$/, "()pw must start with Uppercase ....")
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password and RePassword doesnt match")
    .required("Repassword is required"),
});

const Register = () => {
  // let navigate = useNavigate();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const router = useRouter();
  // const [messageError, setMessageError] = useState("");

  async function handleRegister(values: handleRegisterProps) {
    const loading = toast.loading("Wait Loading...");
    try {
      let { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        // navigate("/login");
        console.log(data);
        toast.dismiss(loading);
        router.push(`/login`);
        formik.resetForm();
        toast.success("Done Registeration ...");
      }
    } catch (error: any) {
      console.log(error);
      toast.dismiss(loading);
      // setMessageError(`${error.response.data.message}`);
      // toast.error(error.message);
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          my: 5,
          p: 5,
          borderRadius: 5,
          mb: isMd ? 5 : 10,
        }}
      >
        <Typography variant="h5" sx={{ mt: 5, ml: 8, color: "primary.main" }}>
          Register Now :
        </Typography>
        <Box
          sx={{
            //   backgroundColor: "secondary.main",
            width: !isSM ? "100%" : "70%",
            // height: "400px",
            //   mt: 3,
            borderRadius: "15px",
            mb: isMd ? 0 : 5,
          }}
        >
          <form></form>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 7,
              ml: isMd ? 30 : 0,
            }}
          >
            <TextField
              label="Name"
              type="text"
              autoComplete="off"
              color="primary"
              // onSubmit={formik.handleSubmit}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              sx={{
                mb: 3,
                "& label": {
                  color: "primary.main",
                },
                "& fieldset": {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            />
            <TextField
              label="Email"
              type="text"
              autoComplete="off"
              color="primary"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              sx={{
                my: 3,
                "& label": {
                  color: "primary.main",
                },
                "& fieldset": {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="off"
              color="primary"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              sx={{
                my: 3,
                "& label": {
                  color: "primary.main",
                },
                "& fieldset": {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            />
            <TextField
              label="Repassword"
              type="password"
              autoComplete="off"
              color="primary"
              error={
                formik.touched.rePassword && Boolean(formik.errors.rePassword)
              }
              helperText={formik.touched.rePassword && formik.errors.rePassword}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              name="rePassword"
              id="rePassword"
              sx={{
                my: 3,
                "& label": {
                  color: "primary.main",
                },
                "& fieldset": {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            />
            <TextField
              label="Phone"
              type="text"
              autoComplete="off"
              color="primary"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              sx={{
                my: 3,
                "& label": {
                  color: "primary.main",
                },
                "& fieldset": {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
