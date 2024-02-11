import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const CategorySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/categories`
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Slider {...settings}>
      {categories.map((category: any) => (
        <Box>
          <img style={{ width: "100%" }} height={200} src={category.image} />
        </Box>
      ))}
    </Slider>
  );
};

export default CategorySlider;
