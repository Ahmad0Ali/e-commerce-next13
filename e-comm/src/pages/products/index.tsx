import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
// import { CartContext } from "@/src/context/CartContext";
import { AppContext } from "@/src/context/AppContext";

const Products = () => {
  const { handleAutoNavigate } = useContext(AppContext);
  useEffect(() => {
    // Check if the page is being loaded on the client side
    handleAutoNavigate();
  }, []);

  return <div>Products</div>;
};

export default Products;
