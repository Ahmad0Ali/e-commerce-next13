import axios from "axios";
import { error } from "console";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<any>(null);

// let headers = {
//   token: localStorage.getItem("userToken"),
// };

let headers = {
  token: "", // Initialize token with an empty string or default value
};

if (typeof window !== "undefined") {
  // Check if window (client-side) is defined before accessing localStorage
  headers.token = localStorage.getItem("userToken") || ""; // Get the user token or use an empty string
}

export function CartProvider(props: any) {
  const [cartId, setCartId] = useState<any>(null);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);

  async function getCart() {
    const response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setCartId(response.data.data._id);
    }
    console.log(response);
  }

  useEffect(() => {
    getCart();
  }, []);

  function addToCart(productId: any) {
    return axios
      .post(
        ` https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(` https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function removeItem(productId: any) {
    return axios
      .delete(
        ` https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function updateProductCount(productId: any, count: any) {
    return axios
      .put(
        ` https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCart() {
    return axios
      .delete(
        ` https://route-ecommerce.onrender.com/api/v1/cart`,

        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function onlinePayment(cartId: any, shippingAddress: any) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeItem,
        updateProductCount,
        clearCart,
        numOfCartItems,
        cartId,
        setNumOfCartItems,
        onlinePayment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
