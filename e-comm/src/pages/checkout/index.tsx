import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { CartContext } from "@/src/context/CartContext";
import { AppContext } from "@/src/context/AppContext";

interface handleSubmitProps {
  details: string;
  city: string;
  phone: string;
}

const validationSchema = yup.object({
  city: yup.string().min(2, "Enter a valid city").required("city is required"),
  details: yup.string().required("Details is required"),
  phone: yup
    .string()
    .matches(/^01[0125][0-9]{8}$/, "phone must be egypt number...")
    .required("phone is required"),
});

const CheckOut = () => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const { handleAutoNavigate } = useContext(AppContext);
  const router = useRouter();

  let { onlinePayment, cartId } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: handleSubmitProps) {
    const response = await onlinePayment(cartId, values);
    if (response?.data?.status === "success") {
      console.log(response.data.session.url);
      router.push(`${response.data.session.url}`);
    }
    console.log(response);
  }
  useEffect(() => {
    handleAutoNavigate();
  }, []);

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
            ml: isMd ? 30 : 0,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", p: 7 }}>
            <TextField
              label="Details"
              type="text"
              autoComplete="off"
              color="primary"
              // onSubmit={formik.handleSubmit}
              error={formik.touched.details && Boolean(formik.errors.details)}
              helperText={formik.touched.details && formik.errors.details}
              onChange={formik.handleChange}
              value={formik.values.details}
              name="details"
              id="details"
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
              label="Cit"
              type="text"
              autoComplete="off"
              color="primary"
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              onChange={formik.handleChange}
              value={formik.values.city}
              name="city"
              id="city"
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
                Pay
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckOut;
