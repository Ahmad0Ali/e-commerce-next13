import Image from "next/image";
// import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Appbar from "../components/appbar";
import FeatueredProduct from "../components/featueredproduct/index";
import CategorySlider from "../components/categorySlider";
import { AppContext } from "@/src/context/AppContext";
import React, { useContext, useEffect, useState } from "react";

const Home = () => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const { handleAutoNavigate } = useContext(AppContext);

  useEffect(() => {
    handleAutoNavigate();
  }, []);

  return (
    <>
      <CategorySlider />
      <FeatueredProduct />
      {/* <div>hello</div> */}
    </>
  );
};

export default Home;
