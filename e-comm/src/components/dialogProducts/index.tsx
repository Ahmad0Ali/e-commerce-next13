import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Slider from "react-slick";

interface DialogProductsProps {
  handleClose: () => void;
  open: boolean;
  productId: any;
}

const DialogProducts: FC<DialogProductsProps> = ({
  handleClose,
  open,
  productId,
}) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function getProductDetails() {
    // const loading = toast.loading("...قيد الارسال");
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${productId}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    // finally {
    //   setLoading(false); // Set loading to false after data retrieval (success or error)
    // }
  }

  useEffect(() => {
    if (open && productId) {
      getProductDetails();
    }
  }, [open, productId]);

  // useEffect(() => {
  //   if (loading) {
  //     // Display a loading toast when loading is true
  //     const loadingToast = toast.loading("Loading product details...");
  //     return () => toast.dismiss(loadingToast); // Dismiss the loading toast when loading changes
  //   }
  // }, [loading]);

  return (
    <>
      {productDetails && (
        <>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogContent sx={{ px: 5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {/* <Slider {...settings}>
                    {productDetails?.images.map((img: any) => (
                      <img src={img} height={200} style={{ width: "50%" }} />
                    ))}
                  </Slider> */}
                  <img
                    src={productDetails?.imageCover}
                    alt=""
                    style={{ width: "50%" }}
                  ></img>
                </Box>
                <Box>
                  <Typography variant="h4">{productDetails?.title}</Typography>
                  <Typography variant="body1">
                    {productDetails?.description}
                  </Typography>
                  <Typography variant="h6">
                    Price: {productDetails?.price} EGP
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                    >
                      +Add
                    </Button>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default DialogProducts;
