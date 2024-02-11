// import { Image } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { FC, useContext, useEffect, useState } from "react";
import RateReview from "@mui/icons-material/StarRateSharp";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import DialogProducts from "../dialogProducts";
import { CartContext } from "@/src/context/CartContext";
import toast from "react-hot-toast";

const FeatueredProduct = () => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  const [open, setOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [products, setProducts] = useState([]);

  const handleClickOpen = (productId: any) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const { addToCart, setNumOfCartItems } = useContext(CartContext);

  async function addProduct(productId: any) {
    const response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      toast.success(response.data.message);
    } else {
      toast.error("Error Add To Cart");
    }
    console.log(response);
  }

  async function getProduct() {
    const loading = toast.loading("Wait Loading Home Page...");
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    toast.dismiss(loading);
    setProducts(data.data);
    toast.success("Home Page Is Ready");
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          pl: 2,
          my: 10,
        }}
      >
        {products.map((product: any) => (
          <>
            <Grid item xl={2} lg={2} md={4} sm={12} xs={12} key={product._id}>
              <Card
                sx={{
                  overflow: "hidden",
                  boxShadow: "1px 1px 55px 0px #00000040",
                  borderRadius: "12px",
                  background: "secondary.light",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "secondary.light",
                  },
                }}
                // onClick={handleClickOpen}
                // onClick={() => handleClickOpen(product._id)}
              >
                <CardContent>
                  <Box
                    sx={{
                      px: 2,
                      py: 4,
                    }}
                  >
                    <img
                      src={product.imageCover}
                      alt=""
                      style={{ width: "100%" }}
                      onClick={() => handleClickOpen(product._id)}
                    />
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {product.category.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} variant="body1">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                        {product.price} EGP
                      </Typography>
                      <Typography
                        sx={{
                          // color: "border.main",
                          textAlign: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        {product.ratingsAverage}
                        <RateReview sx={{ color: "#ffc908" }} />
                      </Typography>
                    </Box>
                    <Button
                      sx={{
                        width: "100%",
                        // p: "1px 2px",
                        bordarRadius: "15px",
                        color: "white",
                        backgroundColor: "primary.main",
                        fontSize: "19px",
                        ":hover": {
                          backgroundColor: "primary.main",
                        },
                      }}
                      onClick={() => addProduct(product._id)}
                    >
                      + Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <DialogProducts
              open={open}
              handleClose={handleClose}
              productId={selectedProductId}
            />
          </>
        ))}
      </Grid>
    </>
  );
};

export default FeatueredProduct;
