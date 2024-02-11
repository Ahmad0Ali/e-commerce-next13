import { CartContext } from "@/src/context/CartContext";
import { Box, Button, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRouter } from "next/router";
import { AppContext } from "@/src/context/AppContext";

const Cart = () => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const { handleAutoNavigate } = useContext(AppContext);
  const {
    getLoggedUserCart,
    removeItem,
    updateProductCount,
    clearCart,
    setNumOfCartItems,
  } = useContext(CartContext);
  const router = useRouter();
  const [cartDetails, setCartDetails] = useState<any>(null);

  async function getCart() {
    const loading = toast.loading("Cart Is Loading ...");
    const response = await getLoggedUserCart();
    // console.log(response);
    toast.dismiss(loading);
    // toast.error("Empty Cart Please Add Some Products");
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
      toast.success("Cart Is Ready Thanks For Waiting");
    }
  }

  async function deleteItem(productId: any) {
    const response = await removeItem(productId);
    setCartDetails(response.data.data);
    setNumOfCartItems(response.data.numOfCartItems);
    toast.success("Product Successful Removed");
    console.log(response);
  }

  async function updateProductQuantity(productId: any, count: any) {
    const response = await updateProductCount(productId, count);
    setCartDetails(response.data.data);
    setNumOfCartItems(response.data.numOfCartItems);
    toast.success("Product count Updated Successfully");
    console.log(response);
  }

  async function deleteAllCart() {
    const response = await clearCart();
    setCartDetails([{}]);
    setNumOfCartItems(response.data.numOfCartItems);
    toast.success("Cart Cleared Successfully");
    // console.log(response);
  }

  const handleCheckoutClick = () => {
    router.push("/checkout");
  };

  useEffect(() => {
    getCart();
    handleAutoNavigate();
  }, []);

  return (
    <>
      {cartDetails !== null && cartDetails.products ? (
        <Box
          sx={{
            backgroundColor: "secondary.main",
            my: 5,
            p: 5,
            borderRadius: 5,
          }}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>
            Shop Cart
          </Typography>
          <Typography variant="h6" color="primary.main">
            Total Cart Price : {cartDetails?.totalCartPrice} EGP
          </Typography>
          {cartDetails.products.map((product: any) => (
            <Box
              key={product.product._id}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                paddingBottom: 2,
                marginBottom: 2,
                mt: 5,
              }}
            >
              <Box sx={{ width: "10%", mr: 2 }}>
                <img
                  src={product.product.imageCover}
                  style={{ width: "100%", borderRadius: 7 }}
                  alt=""
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{product.product.title}</Typography>
                <Typography variant="body1" color="primary.main">
                  Price: {product.price} EGP
                </Typography>
                <IconButton
                  color="error"
                  aria-label="remove"
                  sx={{ ml: -1 }}
                  onClick={() => deleteItem(product.product._id)}
                >
                  <DeleteIcon />
                  Remove
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    updateProductQuantity(
                      product.product._id,
                      product.count - 1
                    )
                  }
                >
                  -
                </Button>
                <Typography variant="body1">{product.count}</Typography>
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() =>
                    updateProductQuantity(
                      product.product._id,
                      product.count + 1
                    )
                  }
                >
                  +
                </Button>
              </Box>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={() => deleteAllCart()}>
              Clear
            </Button>
            <Box>
              <Button variant="contained" onClick={handleCheckoutClick}>
                Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              mt: 5,
              p: 5,
              borderRadius: 5,
            }}
          >
            <Typography variant="h4" color="primary.main">
              Your cart is empty
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Cart;
